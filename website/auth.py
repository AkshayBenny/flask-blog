from flask import Blueprint, render_template, request, flash, redirect, url_for
from .models import User, Blog
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from flask_login import login_user, login_required, logout_user, current_user

auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        user = User.query.filter_by(email=email).first()
        if user:
            if check_password_hash(user.password, password):
                flash("Logged in successfully!", category="success")
                login_user(user, remember=True)
                return redirect(url_for('views.home'))
            else:
                flash("Incorrect password, try again.", category="error")
        else:
            flash("Email does not exist.", category="error")

    return render_template("login.html", title='Login', page_name='Login page', user=current_user)


@auth.route('/logout', methods=['POST', 'GET'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))


@auth.route('/sign_up', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        email = request.form.get('email')
        first_name = request.form.get('first_name')
        password1 = request.form.get('password1')
        password2 = request.form.get('password2')

        user = User.query.filter_by(email=email).first()

        if user:
            flash("Email already exists!", category="error")
        elif len(email) < 4:
            flash("Please enter a valid email address.", category='error')
        elif len(first_name) < 2:
            flash("First name cannot be less than 2 characters.", category='error')
        elif password1 != password2:
            flash("Passwords do not match.", category='error')
        elif len(password1) < 4:
            flash("Password length must be at least 5", category='error')
        else:
            new_user = User(email=email, password=generate_password_hash(password1),
                            first_name=first_name)
            db.session.add(new_user)
            db.session.commit()
            flash("Account created", category="success")
            login_user(user, remember=True)
            return redirect(url_for('views.home'))

    return render_template("sign_up.html", title='Sign Up', page_name='Sign Up page', user=current_user)
