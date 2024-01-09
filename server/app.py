from website import create_app
from flask_cors import CORS, cross_origin

if __name__ == "__main__":
    app = create_app()
    CORS(app)
    app.run(debug=True)


# https://dev.to/nagatodev/how-to-add-login-authentication-to-a-flask-and-react-application-23i7