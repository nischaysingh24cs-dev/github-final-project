import os
from flask import Flask
from flask_talisman import Talisman
from flask_cors import CORS

def create_app():
    # Initialize the Flask application
    app = Flask(__name__)
    
    # Configure CORS policies
    CORS(app)
    
    # Define Content Security Policy (CSP) configurations
    csp = {
        'default-src': '\'self\'',
        'script-src': '\'self\'',
        'style-src': '\'self\'',
    }
    
    # Configure and instantiate Talisman security headers
    Talisman(
        app,
        content_security_policy=csp,
        force_https=False,  # Allow HTTP for local testing; set True in production
        session_cookie_secure=True,
        session_cookie_http_only=True,
        frame_options='SAMEORIGIN'
    )
    
    # Additional server configurations
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'a_very_secure_secret_key')
    
    return app
