from flask import Blueprint, request, flash, jsonify
from flask_login import login_required, current_user
from .models import Blog, User
from . import db
import json
from flask_jwt_extended import jwt_required

views = Blueprint('views', __name__)


@views.route('/', methods=['GET', 'POST'])
# @jwt_required()
def home():
    blogs = Blog.query.all()
    if request.method == 'POST':
        blog = request.json.get('data', None)
        blog_title = request.json.get('title', None)
        user_email = request.json.get('email', None)

        if not user_email | blog | blog_title:
            return {"msg": "Provided data not enough."}

        user = User.query.filter_by(email=user_email).first()

        if not user:
            return {"msg": "User not found in the database."}

        if len(blog) < 1:
            flash('Blog too short', category='error')
        else:
            new_blog = Blog(data=blog, title=blog_title,
                            user_id=user.id)
            db.session.add(new_blog)
            db.session.commit()
            flash('Blog added', category="success")
    blogs_list = [blog.to_dict() for blog in blogs]
    return jsonify({'blogs': blogs_list})


@views.route('/<int:blog_id>', methods=['GET'])
def get_blog_by_id(blog_id):
    blog = Blog.query.get(blog_id)

    if not blog:
        return jsonify({'message': 'Blog not found'})

    return jsonify({'data': blog.to_dict()})


@views.route('/delete-blog', methods=['POST'])
@login_required
def delete_blog():
    if request.method == 'POST':
        data = json.loads(request.data)
        blog_id = data['blogId']
        blog = Blog.query.get(blog_id)

        if blog:
            if blog.user_id == current_user.id:
                db.session.delete(blog)
                db.session.commit()
                return jsonify({"message": "success"})

    return jsonify({})
