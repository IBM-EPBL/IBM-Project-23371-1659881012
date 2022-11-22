from flask import Flask, session, send_from_directory
from flask_session import Session
from flask_cors import CORS, cross_origin

from routes.users import userBp as user_blueprint
from routes.wallets import wallet_blueprint
from routes.expenses import expenses_blueprint

from dotenv import load_dotenv

import os

load_dotenv()
app = Flask(__name__, static_folder="./client/build")
app.secret_key = os.environ["APP_SECRET_KEY"]
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"

Session(app)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app.register_blueprint(user_blueprint)
app.register_blueprint(wallet_blueprint)
app.register_blueprint(expenses_blueprint)


@app.route("/api/session")
def flask_session():
    if session.get("active") == None:
        return {"success": True}
    else:
        return {"success": False}


@app.route("/api/logout")
def logout():
    session.clear()
    return {"success": True, "message": "Logged out successfully"}


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    # app.run("127.0.0.1", 8000, debug=True)
    app.run("0.0.0.0")
