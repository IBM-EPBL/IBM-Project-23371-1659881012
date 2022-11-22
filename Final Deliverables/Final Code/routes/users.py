from flask import Blueprint, session, request
from modules.user import User

userBp = Blueprint('userBp', __name__)


@userBp.route('/api/register', methods=['POST'])
def signup():
    if User().register(request.json):
        user = User().getUser("name", request.json['username'])
        return {
            "success": True,
            "message": "User registered successfully",
            "data": {"user": {"id": user[0], "name": user[1], "email": user[2]}}
        }
    else:
        return {"success": False, "message": "User Already Exist"}


@userBp.route('/api/login', methods=['POST'])
def login():
    if User().login(request.json):
        user = User().getUser("email", request.json['email'])
        return {"success": True, "message": "Login Successfull",
                "data": {"user": {"id": user[0], "name": user[1], "email": user[2]}}
                }
    else:
        return {
            'success': False,
            "message": "Invalid Credentials"
        }


@userBp.route('/api/user/<user_id>', methods=['GET'])
def get_user(user_id):
    user = User().getUser("id", user_id)
    if len(user) > 0:
        return {"success": True, "message": "Login Successfull",
                "data": {"user": {"id": user[0], "name": user[1], "email": user[2]}}
                }
    else:
        return {
            'success': False,
            "message": "No such user found"
        }
