from flask import Blueprint, request
from modules.expenses import Expenses
from modules.user import User
from modules.wallets import Wallets

expenses_blueprint = Blueprint('expenses_blueprint', __name__)


@expenses_blueprint.route('/api/expenses', methods=['POST'])
def add():
    user = User().getUser("id", request.json['user_id'])
    if user:
        wallet = Wallets().getWallet(request.json["user_id"])
        Wallets().update_threshold(
            {"user_id": request.json["user_id"], "threshold": str(int(wallet[2]) - int(request.json["amount"])), "amount": str(wallet[3])})
        Expenses().add(request.json)
        expense = Expenses().get_expense(request.json)
        print(expense)
        return {
            "success": True,
            "message": "Expense added successfully",
            "data": {"expenses": {"id": expense[0], "user_id": expense[1], "title": expense[2], "remarks": expense[3], "category": expense[4], "amount": expense[5]}}
        }
    else:
        return {"success": False, "message": "Invalid User"}


@expenses_blueprint.route('/api/expenses/<user_id>', methods=['GET'])
def get_all(user_id):
    user = User().getUser("id", user_id)
    if user:
        expenses = Expenses().get_all(user_id)
        return {
            "success": True,
            "message": "Expense fetched successfully",
            "data": {"expenses": expenses}
        }
    else:
        return {"success": False, "message": "Invalid User"}


@expenses_blueprint.route('/api/expenses/category/<user_id>', methods=['GET'])
def get_category(user_id):
    user = User().getUser("id", user_id)
    if user:
        expenses = Expenses().expense_category(user_id)
        return {
            "success": True,
            "message": "Expense fetched successfully",
            "data": {"expenses": expenses}
        }
    else:
        return {"success": False, "message": "Invalid User"}
