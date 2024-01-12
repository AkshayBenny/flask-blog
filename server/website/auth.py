from flask import Blueprint, render_template, request, flash, redirect, url_for
from .models import User
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from flask_login import login_user, login_required, logout_user, current_user
import json
from flask import Flask, request, jsonify
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, \
    unset_jwt_cookies, jwt_required, JWTManager


auth = Blueprint('auth', __name__)


@auth.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        return response


@auth.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


@auth.route('/token', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return {"msg": "Wrong email or password"}, 401

    access_token = create_access_token(identity=email)
    response = {"access_token": access_token}
    return response
    # email = request.json.get("email", None)
    # password = request.json.get("password", None)

    # user = User.query.filter_by(email=email).first()
    # if user:
    #     if not check_password_hash(user.password, password):
    #         return {"msg": "Wrong email or password"}, 401

    #     access_token = create_access_token(identity=email)
    #     response = {"access_token": access_token}
    #     return response


@auth.route('/profile')
@jwt_required()
def my_profile():
    response_body = {
        "name": "Akshay",
        "about": "Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body


@auth.route('/sign_up', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        email = request.json.get('email')
        name = request.json.get('name')
        password1 = request.json.get('password1')
        password2 = request.json.get('password2')

        user = User.query.filter_by(email=email).first()

        if user:
            flash("Email already exists!", category="error")
        elif len(email) < 4:
            flash("Please enter a valid email address.", category='error')
        elif len(name) < 2:
            flash("Name cannot be less than 2 characters.", category='error')
        elif password1 != password2:
            flash("Passwords do not match.", category='error')
        elif len(password1) < 4:
            flash("Password length must be at least 5", category='error')
        else:
            new_user = User(email=email, password=generate_password_hash(password1),
                            name=name)
            db.session.add(new_user)
            db.session.commit()
    access_token = create_access_token(identity=email)
    response = {"access_token": access_token}
    return response

# @auth.route('/login', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         email = request.form.get('email')
#         password = request.form.get('password')

#         user = User.query.filter_by(email=email).first()
#         if user:
#             if check_password_hash(user.password, password):
#                 flash("Logged in successfully!", category="success")
#                 login_user(user, remember=True)
#                 return redirect(url_for('views.home'))
#             else:
#                 flash("Incorrect password, try again.", category="error")
#         else:
#             flash("Email does not exist.", category="error")

#     return render_template("login.html", title='Login', page_name='Login page', user=current_user)


# @auth.route('/logout', methods=['POST', 'GET'])
# @login_required
# def logout():
#     logout_user()
#     return redirect(url_for('auth.login'))
