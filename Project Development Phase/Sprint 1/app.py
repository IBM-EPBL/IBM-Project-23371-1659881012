from flask import Flask, redirect, session
from flask_session import Session

from routes.users import userBp as user_blueprint
from routes.wallets import wallet_blueprint
from routes.expenses import expenses_blueprint

from dotenv import load_dotenv

import os

load_dotenv()
app = Flask(__name__)
app.secret_key = os.environ["APP_SECRET_KEY"]
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"

Session(app)

app.register_blueprint(user_blueprint)
app.register_blueprint(wallet_blueprint)
app.register_blueprint(expenses_blueprint)


@app.route("/")
def index():
    if session.get("active") == None:
        return {"success": True}
    else:
        return {"success": False}


@app.route("/api/logout")
def logout():
    session.clear()
    return {"success": True}


if __name__ == '__main__':
    app.run("127.0.0.1", 8000, debug=True)
