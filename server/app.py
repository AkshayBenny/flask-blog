from website import create_app
from flask_cors import CORS
from website.limiter_setup import limiter

if __name__ == "__main__":
    app = create_app()
    limiter.init_app(app)
    CORS(app)
    app.run(debug=True)
