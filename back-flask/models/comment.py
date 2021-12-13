import mongoengine as db

class Comment(db.Document):
    uid = db.StringField()
    recipe_id = db.StringField()
    username = db.StringField(required=True)
    body = db.StringField(required=True)
    user_id = db.StringField()

    def to_json(self):
        return {
            "uid": self.uid,
            "recipe_id": self.recipe_id,
            "username": self.username,
            "body": self.body,
            "user_id": self.user_id
        }