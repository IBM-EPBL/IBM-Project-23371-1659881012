from werkzeug.security import generate_password_hash, check_password_hash
from flask import session
from modules.db import Db


class User(Db):
    def __init__(self) -> None:
        super().__init__()

    def register(self, form) -> bool:
        return self.insert(
            "users", [
                form['username'],
                form['email'],
                generate_password_hash(form['password'])
            ], ["username", "email", "password"]
        )

    def login(self, form):
        try:
            data = self.get("users", f"username='{form['username']}'")
            if len(data) != 0:
                if check_password_hash(data[3], form["password"]):
                    session["active"] = data[1]
                    return True
                else:
                    return False
            else:
                return False
        except Exception as e:
            print(e)
            return False

    def getUser(self, by, value):
        try:
            if (by == "id"):
                return self.get("users", f"id='{value}'")
            elif (by == "name"):
                return self.get("users", f"username='{value}'")
            elif (by == "email"):
                return self.get("users", f"email='{value}'")
        except Exception as e:
            print(e)
            return False
