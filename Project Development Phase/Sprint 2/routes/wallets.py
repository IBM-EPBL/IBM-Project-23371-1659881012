from flask import Blueprint, request
from modules.wallets import Wallets

wallet_blueprint = Blueprint('wallet_blueprint', __name__)


@wallet_blueprint.route('/api/wallet', methods=['POST'])
def add():
    wallet = Wallets().getWallet(request.form["user_id"])
    if not wallet:
        Wallets().add(request.form)
        wallet = Wallets().getWallet(request.form["user_id"])
        return {
            "success": True,
            "message": "Wallet added successfully",
            "data": {"wallet": {"id": wallet[0], "user_id": wallet[1], "threshold": wallet[2], "amount": wallet[3]}}
        }
    else:
        return {
            "success": True,
            "message": "Wallet fetched successfully",
            "data": {"wallet": {"id": wallet[0], "user_id": wallet[1], "threshold": wallet[2], "amount": wallet[3]}}
        }


@wallet_blueprint.route('/api/wallet/<user_id>', methods=['GET'])
def get(user_id):
    wallet = Wallets().getWallet(user_id)
    if wallet:
        return {
            "success": True,
            "message": "Wallet fetched successfully",
            "data": {"wallet": {"id": wallet[0], "user_id": wallet[1], "threshold": wallet[2], "amount": wallet[3]}}
        }
    else:
        return {
            "success": True,
            "message": "No wallet found.",
        }


@wallet_blueprint.route('/api/wallet/', methods=['PATCH'])
def update():
    wallet = Wallets().getWallet(request.form["user_id"])
    if wallet:
        Wallets().update_threshold(request.form)
        updated_wallet = Wallets().getWallet(request.form["user_id"])
        return {
            "success": True,
            "message": "Threshold updated successfully",
            "data": {"wallet": {"id": updated_wallet[0], "user_id": updated_wallet[1], "threshold": updated_wallet[2], "amount": wallet[3]}}
        }
    else:
        return {
            "success": True,
            "message": "No wallet found.",
        }
