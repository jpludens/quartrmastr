import sqlite3
from db import get_connection, get_from_datamaster

requirements = []


def build():
    with get_connection() as con:
        cur = con.cursor()
        cur.execute("DROP TABLE IF EXISTS Materials")
        cur.execute("CREATE TABLE Materials("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "MaterialName TEXT, "
                    "MaterialPrice INTEGER)")

        for csv_row in get_from_datamaster('Materials.csv'):
            cur.execute("INSERT INTO Materials ("
                        "MaterialName, MaterialPrice) "
                        "VALUES (\"{}\", \"{}\")".format(
                            csv_row.get('MaterialName'),
                            # TODO: Change this. ItemPrice? ShopPrice? PurchaseCost?
                            csv_row.get('Price')))


def read():
    con = get_connection()
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "Id AS id, "
                    "MaterialName AS name, "
                    "MaterialPrice AS gold "
                    "FROM Materials")
        return [dict(row) for row in cur.fetchall()]
