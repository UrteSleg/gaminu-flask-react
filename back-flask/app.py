from flask import Flask, request, Response, render_template, session, redirect
from flask.helpers import make_response, url_for
from authlib.integrations.flask_client import OAuth
from flask_mongoengine import DoesNotExist
import mongoengine as db
import datetime
import uuid
from functools import wraps
from dotenv import load_dotenv
import os
from models.recipe import Recipe
from models.comment import Comment
from models.category import Category
from models.user import User
from helpers.validation import is_valid_email
import jwt
from flask_cors import CORS

FRONT_END_URI = 'http://localhost:3000'

app = Flask(__name__)
CORS(app)
load_dotenv()

app.secret_key = os.getenv("APP_SECRET_KEY")

db.connect(
    db= "STPP",
    username=os.getenv("DB_USER"),
    password=os.getenv("DB_PASS"),
    host=os.getenv("DB_URI"),
)

oauth = OAuth(app)
google = oauth.register(
    name="google",
    client_id=os.getenv("GOOGLE_AUTH"),
    client_secret=os.getenv("GOOGLE_SECRET"),
    access_token_url="https://accounts.google.com/o/oauth2/token",
    access_token_params=None,
    authorize_url="https://accounts.google.com/o/oauth2/auth",
    authorize_params=None,
    api_base_url="https://www.googleapis.com/oauth2/v1/",
    client_kwargs={"scope": "openid profile email"},
)

def authenticate(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        session_data = dict(session)
        session_token = session_data["jwt"] if "jwt" in session_data else None
        auth_header = request.headers["Authorization"] if "Authorization" in request.headers else session_token
        if auth_header is None:
            return redirect(url_for("login", _external=True))
        else:
            try:
                data = jwt.decode(auth_header, os.getenv("APP_SECRET_KEY"), algorithms="HS256")
                if "email" in data:
                    user = User.objects(email=data["email"]).first()
                    if user is None:
                        for key in list(session.keys()):
                            session.pop(key)
                        return redirect("/login")
                    else: 
                        session["user"] = data
                else:
                    return redirect("/login")
            except Exception:
                for key in list(session.keys()):
                    session.pop(key)
                return redirect("/login")
        print(session)
        return f(*args, **kwargs)
    return wrapper

@app.route("/")
def home():
    return "Gaminu"

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/perform-login")
def perform_login():
    google = oauth.create_client("google")
    redirect_url = url_for("authorize", _external=True)
    print(redirect_url)
    return google.authorize_redirect(redirect_url)

@app.route("/user")
def user():
    session_data = dict(session)
    if 'jwt' in session_data:
        return {'success': True, 'response': 200, 'error': '', 'data': session["jwt"]}
    return {'success': False, 'response': 403, 'error': 'Access is forbidden'}

@app.route("/logout")
@authenticate
def logout():
    for key in list(session.keys()):
        session.pop(key)

    return redirect(f'{FRONT_END_URI}')

@app.route("/authorize")
def authorize():
    google = oauth.create_client("google")
    token = google.authorize_access_token()
    resp = google.get("userinfo")
    user_info = resp.json()
    if is_valid_email(user_info["email"]):
        email = user_info["email"]
        user_cnt = User.objects.count()
        user = User.objects(email=email).first()
        if user is None:
            usr = User(
                email = user_info["email"], 
                auth_id = user_info["id"] if user_info["id"] else str(uuid.uuid4())[:10],
                given_name = user_info["given_name"],
                family_name = user_info["family_name"],
                picture = user_info["picture"],
                is_admin = True if user_cnt == 0 else False
                )
            usr.save()
            session["user"] = usr.to_json()
        else:
            user["auth_id"] = user_info["id"]
            user.save()
            session["user"] = user.to_json()

        session["jwt"] = jwt.encode(session["user"], os.getenv("APP_SECRET_KEY"), algorithm="HS256")
        #return {'success': True, 'response': 200, 'error': '', 'data': session["jwt"]}
        response = make_response(redirect(f'{FRONT_END_URI}/auth?token={session["jwt"]}'))
        return response
    else:
        logout()    
        return redirect(f"{FRONT_END_URI}/login")

@app.route('/categories', methods = ['GET'])
def get_categories():
    try: 
        categories = Category.objects().to_json()
        return Response(categories, mimetype="application/json", status=200) 
    except DoesNotExist:
        return {'success': False, 'response': 404, 'error': 'Category does not exist'}
    except Exception as e:
        return {'success': False, 'response': 400, 'error': 'Bad request'}

@app.route('/category', methods = ['POST'])
@authenticate
def create_category():
    session_data = dict(session)
    check_is_admin = session_data["user"]["is_admin"]
    if check_is_admin == False:
        return {'success': False, 'response': 403, 'error': 'Access is forbidden'}
        
    try: 
        data = request.get_json()
        data['uid'] = str(uuid.uuid4())[:6]
        Category(**data).save()
        category = Category.objects.get(uid=data['uid']).to_json()
        return category, 201
    except DoesNotExist:
        return {'success': False, 'response': 404, 'error': 'Category does not exist'}
    except Exception as e:
        return {'success': False, 'response': 400, 'error': 'Bad request'}


@app.route('/category/<id>', methods = ['DELETE'])
@authenticate 
def delete_category(id):
    session_data = dict(session)
    check_is_admin = session_data["user"]["is_admin"]
    if check_is_admin == False:
        return {'success': False, 'response': 403, 'error': 'Access is forbidden'}
        
    try:
        Category.objects.get(uid=id).delete()
        return {'success': True, 'response': 200, 'error': ''}
    except DoesNotExist:
        return {'success': False, 'response': 404, 'error': 'Category does not exist'}
    except Exception as e:
        return {'success': False, 'response': 400, 'error': 'Bad request'}

@app.route('/category/<id>', methods = ['GET'])
def category_by_id(id):
    try: 
        category = Category.objects.get(uid=id).to_json()
        return category, 200
    except DoesNotExist:
        return {'success': False, 'response': 404, 'error': 'Category does not exist'}
    except Exception as e:
        return {'success': False, 'response': 400, 'error': 'Bad request'}
    
@app.route('/category/<id>', methods = ['PUT'])
@authenticate 
def update_category(id):
    session_data = dict(session)
    check_is_admin = session_data["user"]["is_admin"]
    if check_is_admin == False:
        return {'success': False, 'response': 403, 'error': 'Access is forbidden'}
        
    try: 
        title = request.get_json(force= True)
        Category.objects.get(uid=id).update(**title)
        category = Category.objects.get(uid=id).to_json()
        return category, 200
    except DoesNotExist:
        return {'success': False, 'response': 404, 'error': 'Category does not exist'}
    except Exception as e:
        return {'success': False, 'response': 400, 'error': 'Bad request'}

@app.route('/category/<id>/recipe', methods = ['POST'])
@authenticate 
def post_recipe(id):
    session_data = dict(session)
    user_id = session_data["user"]["auth_id"]

    try:
        if(Category.objects.get(uid=id)):
            body = request.get_json()
            body['uid'] = str(uuid.uuid4())[:8]
            body['category_id'] = id
            body['date_published'] = datetime.datetime.utcnow()
            body['user_id'] = user_id
            user = User.objects(auth_id=user_id).get()
            user["recipes"].append(body['uid'])
            user.save()
            Recipe(**body).save()
            return Recipe.objects.get(uid=body['uid']).to_json(), 201
        else:
            return {'success': False, 'response': 404, 'error': 'Category does not exist'}
    except DoesNotExist:
        return {'success': False, 'response': 404, 'error': 'Category does not exist'}
    except Exception as e:
        print(e)
        return {'success': False, 'response': 400, 'error': 'Bad request'}

@app.route('/category/<id>/recipes', methods = ['GET'])
def get_recipes(id):
    try:
        if(Category.objects.get(uid=id)):
            recipes = Recipe.objects(category_id=id).all().to_json()
            return recipes, 200
    except DoesNotExist:
        return {'success': False, 'response': 404, 'error': 'Category does not exist'}
    except Exception as e:
        return {'success': False, 'response': 400, 'error': 'Bad request'}

@app.route('/recipe/<id>', methods = ['DELETE'])
@authenticate 
def delete_recipe(id):
    session_data = dict(session)
    check_is_admin = session_data["user"]["is_admin"]
    try:
        recipe = Recipe.objects.get(uid=id)
        if recipe["user_id"] == session_data["user"]["auth_id"] or check_is_admin:
            recipe.delete()
            return {'success': True, 'response': 200, 'error': ''}
        return {'success': False, 'response': 403, 'error': 'Forbidden'}
    except DoesNotExist:
        return {'success': False, 'response': 404, 'error': 'Recipe does not exist'}
    except Exception as e:
        return {'success': False, 'response': 400, 'error': 'Bad request'}

@app.route('/recipe/<id>', methods = ['PUT'])
@authenticate 
def update_recipe(id):
    session_data = dict(session)
    check_is_admin = session_data["user"]["is_admin"]
    try:
        recipe = Recipe.objects.get(uid=id)
        if recipe["user_id"] == session_data["user"]["auth_id"] or check_is_admin:
            data = request.get_json(force= True)
            recipe.update(**data)
            return recipe.to_json(), 200
        return {'success': False, 'response': 403, 'error': 'Forbidden'}
    except DoesNotExist:
        return {'success': False, 'response': 404, 'error': 'Recipe does not exist'}
    except Exception as e:
        return {'success': False, 'response': 400, 'error': 'Bad request'}

@app.route('/recipe/<id>', methods = ['GET'])
def get_recipe_by_id(id):  
    try:
        recipe = Recipe.objects.get(uid=id).to_json()
        return recipe, 200
    except DoesNotExist:
        return {'success': False, 'response': 404, 'error': 'Recipe does not exist'}
    except Exception as e:
        return {'success': False, 'response': 400, 'error': 'Bad request'}

@app.route('/recipe/<id>/comment', methods = ['POST'])
@authenticate
def post_comment(id):
    session_data = dict(session)
    user_id = session_data["user"]["auth_id"]
    user_name = session_data["user"]["given_name"]
    try:
        if(Recipe.objects.get(uid=id)):
            body = request.get_json()
            body['uid'] = str(uuid.uuid4())[:8]
            body['recipe_id'] = id
            body['user_id'] = user_id
            body['username'] = user_name
            user = User.objects(auth_id=user_id).get()
            user["comments"].append(body['uid'])
            user.save()
            Comment(**body).save()
            return Comment.objects.get(uid=body['uid']).to_json(), 201
    except DoesNotExist:
        return {'success': False, 'response': 404, 'error': 'Recipe does not exist'}
    except Exception as e:
        return {'success': False, 'response': 400, 'error': 'Bad request'}

@app.route('/recipe/<id>/comments', methods = ['GET'])
def get_comments(id):
    try:
        if(Recipe.objects.get(uid=id)):
            comments = Comment.objects(recipe_id=id).all().to_json()
            return comments, 200
    except DoesNotExist:
        return {'success': False, 'response': 404, 'error': 'Recipe does not exist'}
    except Exception as e:
        return {'success': False, 'response': 400, 'error': 'Bad request'}

@app.route('/comment/<id>', methods = ['DELETE'])
@authenticate 
def delete_comment(id):
    session_data = dict(session)
    check_is_admin = session_data["user"]["is_admin"]
    try:
        comment = Comment.objects.get(uid=id)
        if comment["user_id"] == session_data["user"]["auth_id"] or check_is_admin:
            comment.delete()
            return {'success': True, 'response': 200, 'error': ''}
        return {'success': False, 'response': 403, 'error': 'Forbidden'}
    except DoesNotExist:
        return {'success': False, 'response': 404, 'error': 'Comment does not exist'}
    except Exception as e:
        return {'success': False, 'response': 400, 'error': 'Bad request'}

@app.route('/comment/<id>', methods = ['PUT'])
@authenticate 
def update_comment(id):
    session_data = dict(session)
    check_is_admin = session_data["user"]["is_admin"]

    try:
        comment = Comment.objects.get(uid=id)
        if comment["user_id"] == session_data["user"]["auth_id"] or check_is_admin:
            data = request.get_json(force= True)
            comment.update(**data)
            return comment.to_json(), 200
        return {'success': False, 'response': 403, 'error': 'Forbidden'}
    except DoesNotExist:
        return {'success': False, 'response': 404, 'error': 'Comment does not exist'}
    except Exception as e:
        return {'success': False, 'response': 400, 'error': 'Bad request'}

@app.route('/comment/<id>', methods = ['GET'])
def get_comment_by_id(id):  
    try:
        comment = Comment.objects.get(uid=id).to_json()
        return comment, 200
    except DoesNotExist:
        return {'success': False, 'response': 404, 'error': 'Comment does not exist'}
    except Exception as e:
        return {'success': False, 'response': 400, 'error': 'Bad request'}

#-------------

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000, debug=True)