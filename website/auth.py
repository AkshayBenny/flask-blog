from flask import Blueprint, render_template, request, flash

auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['GET', 'POST'])
def login():
    data = request.form
    print(data)
    return render_template("login.html", title='Login', page_name='Login page')


@auth.route('/logout', methods=['POST'])
def logout():
    return '<h1>logout</h1>'


@auth.route('/sign_up', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        email = request.form.get('email')
        first_name = request.form.get('first_name')
        password1 = request.form.get('password1')
        password2 = request.form.get('password2')

        if len(email) < 4:
            flash("Please enter a valid email address.", category='error')
        elif len(first_name) < 2:
            flash("First name cannot be less than 2 characters.", category='error')
        elif password1 != password2:
            flash("Passwords do not match.", category='error')
        elif len(password1) < 4:
            flash("Password length must be at least 5", category='error')
        else:
            flash("Account created", category="success")

    return render_template("sign_up.html", title='Sign Up', page_name='Sign Up page')
