from flask import session
from modules.db import Db


class Expenses(Db):
    def __init__(self) -> None:
        super().__init__()

    def add(self, form):
        return self.insert(
            "expenses", [
                form['user_id'],
                form['title'],
                form['remarks'],
                form['category'],
                form['amount']
            ], ["user_id",
                "title",
                "remarks",
                "category",
                "amount"]
        )

    def get_expense(self, form):
        return self.get("expenses", "user_id = " + form["user_id"] + " and title = '" + form["title"] + "' and amount = " + form["amount"])

    def get_all(self, user_id):
        return self.getall("expenses", "user_id = " + user_id)

    def expense_category(self, id):
        return self.getall("expenses", "user_id = " + id + " GROUP BY category", "category, Count(user_id)")
