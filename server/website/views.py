from flask import Blueprint, render_template, request, flash, jsonify
from flask_login import login_required, current_user
from .models import Blog
from . import db
import json

views = Blueprint('views', __name__)


@views.route('/', methods=['GET', 'POST'])
def home():
    blogs = Blog.query.all()
    if request.method == 'POST':
        blog = request.form.get('blog')
        blog_title = request.form.get('title')
        if len(blog) < 1:
            flash('Blog too short', category='error')
        else:
            new_blog = Blog(data=blog, title=blog_title,
                            user_id=current_user.id)
            db.session.add(new_blog)
            db.session.commit()
            flash('Blog added', category="success")
    blogs_list = [blog.to_dict() for blog in blogs]
    return jsonify({'blogs': blogs_list})
    # return render_template("home.html", user=current_user, blogs=blogs)


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
