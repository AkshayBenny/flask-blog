from website import create_app
from flask_cors import CORS
from website.limiter_setup import limiter
from flask_wtf.csrf import CSRFProtect
from flask_talisman import Talisman

if __name__ == "__main__":
    app = create_app()
    app.config['SECRET_KEY'] = 'DFAIGARG9AERGHAGFAFGKAFGADFGLHBA'
    CSRFProtect(app)
    Talisman(app)
    CORS(app)
    limiter.init_app(app)
    app.run(debug=True)
