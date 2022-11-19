from flask import Blueprint, session, request
from modules.user import User

userBp = Blueprint('userBp', __name__)


@userBp.route('/api/register', methods=['POST'])
def signup():
    if User().register(request.form):
        user = User().getUser("name", request.form['username'])
        return {
            "success": True,
            "message": "User registered successfully",
            "data": {"user": {"id": user[0], "name": user[1], "email": user[2]}}
        }
    else:
        return {"success": False, "message": "Validations Failed"}


@userBp.route('/api/login', methods=['POST'])
def login():
    if User().login(request.form):
        user = User().getUser("name", request.form['username'])
        return {"success": True, "message": "Login Successfull",
                "data": {"user": {"id": user[0], "name": user[1], "email": user[2]}}
                }
    else:
        return {
            'success': False,
            "message": "Invalid Credentials"
        }
