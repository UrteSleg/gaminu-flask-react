import mongoengine as db

class User(db.Document):
    email = db.StringField()
    auth_id = db.StringField()
    given_name = db.StringField()
    family_name = db.StringField()
    picture = db.StringField()
    is_admin = db.BooleanField()
    recipes = db.ListField(default=[])
    comments = db.ListField(default=[])

    def to_json(self):
        return {
            "email": self.email,
            "auth_id": self.auth_id,
            "given_name": self.given_name,
            "family_name": self.family_name,
            "picture": self.picture,
            "is_admin": self.is_admin,
            "recipes": self.recipes,
            "comments": self.comments
        }