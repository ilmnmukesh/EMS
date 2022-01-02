from logging import log
from web3.contract import Contract
from web3.middleware import geth_poa_middleware
import web3
import json
with open("packages/abi.json", "r") as s:
    abi = json.load(s)


w3 = web3.Web3(web3.HTTPProvider("http://127.0.0.1:8545"))
w3.middleware_onion.inject(geth_poa_middleware, layer=0)
me = w3.eth.get_accounts()[0]
cntr: Contract = w3.eth.contract(
    "0xF19ee5A0BAFa82a9C65709B8b4556E0ab9F30fC1", abi=abi["output"]["abi"])


def login(std_id):
    x, y = cntr.functions.login(std_id).call()
    return {
        "std_id": x,
        "password": y
    }


def addEnrollment(std_id, cl_id):
    arr = cntr.functions.addEnrollment(std_id, cl_id)
    arr.transact({"from": me, 'gas': 700000, })
    return arr.call()


def updateEnrollment(std):
    arr = cntr.functions.updateEnrollment(**std)
    arr.transact({"from": me, 'gas': 700000, })
    return arr.call()


if __name__ == "__main__":
    print(login(2019202034))
    print(addEnrollment(2019202034, 1))
    a = {'std_id': int('2019202034'), 'cl_id': 1, 'em': 0, 'im': 0, 'att': 0,
         'att1': 0, 'att2': 0, 'att3': 10, 'int1': 0, 'int2': 0, 'int3': 0}

    print(updateEnrollment(a))
