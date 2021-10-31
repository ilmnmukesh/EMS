from web3.contract import Contract
from web3.middleware import geth_poa_middleware
import web3
import json
with open("abi.json", "r") as s:
    abi = json.load(s)

with open('dummy.json', "r") as s:
    dummy = json.load(s)


w3 = web3.Web3(web3.HTTPProvider("http://127.0.0.1:7545"))
w3.middleware_onion.inject(geth_poa_middleware, layer=0)
me = w3.eth.get_accounts()[0]
cntr: Contract = w3.eth.contract(
    "0x3e7D4f5D5fe96378c969F17fa984A07Bf977c24b", abi=abi["output"]["abi"])


def add(name, **val):
    parmas = getattr(cntr.functions, "create"+name.capitalize())(**val)
    txn = parmas.transact({"from": me, 'gas': 700000, })
    print(txn)


# def get(addr):
#     print(cntr.functions.std(addr).call())


def underline(n=40, star="*"):
    print(star*n)


def displayTable(name, key, data, star="^"):
    length = 1
    column = "|"
    for x in key:
        if "name" in x:
            length += len(x)+15+1
            column += "%-" + str(len(x)+15)+"s|"
        else:
            length += len(x)+5+1
            column += "%-" + str(len(x)+5)+"s|"
    print("Table name: %s" % name)
    underline(length, star)
    print(column % tuple(key))
    underline(length, star)
    for x in data:
        ele = []
        for y in key:
            ele.append(x[y])
        print(column % tuple(ele))
    underline(length, star)


if __name__ == "__main__":
    for x in dummy.keys():
        displayTable(x, dummy[x][0].keys(), dummy[x])
        print("create"+x.capitalize())

        for y in dummy[x]:
            add(x, **y)
