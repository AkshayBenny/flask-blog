from flask import Blueprint, request, flash, jsonify
from flask_login import login_required, current_user
from .models import Blog, User
from . import db
from flask_jwt_extended import jwt_required
from .limiter_setup import limiter

views = Blueprint('views', __name__)


@views.route('/', methods=['GET'])
@limiter.limit("20 per minute")
def home():
    blogs = Blog.query.all()
    blogs_list = [blog.to_dict() for blog in blogs]
    return jsonify({'blogs': blogs_list})


@views.route('/create_blog', methods=['POST'])
@jwt_required()
@limiter.limit("5 per minute")
def create_blog():
    blog = request.json.get('data', None)
    blog_title = request.json.get('title', None)
    user_email = request.json.get('user_email', None)

    if not user_email or not blog or not blog_title:
        return {"msg": "Provided data not enough.", "blog_data": blog, "blog_title": blog_title, "user_email": user_email}

    user = User.query.filter_by(email=user_email).first()

    if not user:
        return {"msg": "User not found in the database."}

    if len(blog) < 1:
        # flash('Blog too short', category='error')
        print("Blog too short")
        return {"msg": "Blog too short."}

    else:
        new_blog = Blog(data=blog, title=blog_title,
                        user_id=user.id)
        db.session.add(new_blog)
        db.session.commit()
        # flash('Blog added', category="success")
        print("Blog added")
        return {"msg": "Blog added successfully."}


@views.route('/<int:blog_id>', methods=['GET'])
@limiter.limit("50 per minute")
def get_blog_by_id(blog_id):
    blog = Blog.query.get(blog_id)

    if not blog:
        return jsonify({'message': 'Blog not found'})

    return jsonify({'data': blog.to_dict()})


@views.route('/delete_blog', methods=['POST'])
@jwt_required()
@limiter.limit("10 per minute")
def delete_blog():
    if request.method == 'POST':
        blog_id = request.json.get('blog_id')
        user_email = request.json.get('user_email')
        blog = Blog.query.get(blog_id)
        user = User.query.filter_by(email=user_email).first()

        if blog:
            if blog.user_id == user.id:
                db.session.delete(blog)
                db.session.commit()
                return {"message": "success"}
        return {"msg": "failure"}

    return {}
