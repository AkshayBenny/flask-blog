from website import create_app
from flask_cors import CORS
from website.limiter_setup import limiter
from flask_wtf.csrf import CSRFProtect

if __name__ == "__main__":
    app = create_app()
    app.config['SECRET_KEY'] = 'DFAIGARG9AERGHAGFAFGKAFGADFGLHBA'
    csrf = CSRFProtect(app)
    limiter.init_app(app)
    CORS(app)
    app.run(debug=True)
