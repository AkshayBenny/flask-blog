from website import create_app
from flask_cors import CORS, cross_origin

if __name__ == "__main__":
    app = create_app()
    CORS(app)
    app.run(debug=True)
