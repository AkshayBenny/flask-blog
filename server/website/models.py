from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func


class Blog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(500))
    data = db.Column(db.String(100000))
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    # user = db.relationship('User', backref='blogs')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'data': self.data,
            'date': self.date.strftime("%Y-%m-%d %H:%M:%S"),
            'user_id': self.user_id
        }


# class Comment(db.Model):
#     id = db.Column(db.Integer, primary_keys=True)
#     comment = db.Column(db.String(5000))
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    first_name = db.Column(db.String(150))
    blogs = db.relationship('Blog')


# NEW MODELS

# --------------
# UserInteraction
# --------------
# UserID: Foreign Key from User.
# BlogID: Foreign Key from Blog.
# InteractionType: (e.g., read, like, share, comment).
# Timestamp: To track when the interaction occurred.

# --------------
# UserPreferences
# --------------
# UserID: Foreign Key from User.
# PreferenceType: (e.g., preferred tags, disliked tags).
# PreferenceValue: The actual value of the preference.

# --------------
# BlogRatings
# --------------
# BlogID: Foreign Key from Blog.
# UserID: Foreign Key from User.
# Rating: The rating a user gives to a blog post.
