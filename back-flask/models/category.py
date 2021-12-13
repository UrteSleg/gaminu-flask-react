import mongoengine as db

class Category(db.Document):
    uid = db.StringField()
    title = db.StringField(required=True)

    def to_json(self):
        return {
            "uid": self.uid,
            "title": self.title
        }
