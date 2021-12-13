import mongoengine as db

class Recipe(db.Document):
    uid = db.StringField()
    category_id = db.StringField()
    name = db.StringField(required=True)
    ingredients = db.StringField(required=True)
    description = db.StringField(required=True)
    imageURL = db.StringField()
    date_published = db.DateTimeField()
    user_id = db.StringField()

    def to_json(self):
        return {
            "uid": self.uid,
            "category_id": self.category_id,
            "name": self.name,
            "ingredients": self.ingredients,
            "description": self.description,
            "imageURL": self.imageURL,
            "date_published": self.date_published,
            "user_id": self.user_id
        }