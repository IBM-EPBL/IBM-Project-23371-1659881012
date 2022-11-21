from flask import session
from modules.db import Db


class Wallets(Db):
    def __init__(self) -> None:
        super().__init__()

    def getWallet(self, id):
        try:
            return self.get("wallets", f"user_id={id}")
        except Exception as e:
            print(e)
            return False

    def add(self, form) -> bool:
        try:
            return self.insert(
                "wallets", [
                    form['user_id'],
                    form['amount'],
                    form['threshold']
                ], ["user_id", "amount", "threshold"]
            )
        except Exception as e:
            print(e)
            return False

    def update_threshold(self, form):
        try:
            print(form)
            query = "update wallets set threshold = " + \
                str(form["threshold"]) + \
                ", amount =" + str(form["amount"]) + \
                " where user_id = " + str(form["user_id"])
            print(query)
            return self.execute(query)
        except Exception as e:
            print(e)
            return False
