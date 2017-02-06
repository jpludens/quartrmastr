import sqlite3
from db import get_connection, get_from_datamaster

requirements = []


def build():
    with get_connection() as con:
        cur = con.cursor()
        cur.execute("DROP TABLE IF EXISTS EquipSlotTypes")
        cur.execute("CREATE TABLE EquipSlotTypes("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "EquipSlotTypeName TEXT)")

        for csv_row in get_from_datamaster('EquipSlotTypes.csv'):
            cur.execute("INSERT INTO EquipSlotTypes ("
                        "EquipSlotTypeName) "
                        "VALUES (\"{}\")".format(
                            csv_row.get('EquipSlotTypeName')))


def read():
    con = get_connection()
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "Id AS id, "
                    "EquipSlotTypeName AS name "
                    "FROM EquipSlotTypes")
        return [dict(row) for row in cur.fetchall()]
