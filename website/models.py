from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func


class Blog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(500))
    data = db.Column(db.String(100000))
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


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
