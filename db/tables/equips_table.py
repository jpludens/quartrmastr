import os
import sqlite3
from db.tables import get_connection, get_from_datamaster

requirements = []


def build():
    # TODO Add link to EquipSlot
    with get_connection() as con:
        cur = con.cursor()
        cur.execute("DROP TABLE IF EXISTS Equips")
        cur.execute("CREATE TABLE Equips("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "EquipName TEXT, "
                    "EquipSlot TEXT)")

        for csv_row in get_from_datamaster('Equips.csv'):
            cur.execute("INSERT INTO Equips ("
                        "EquipName, EquipSlot) "
                        "VALUES (\"{}\", \"{}\")".format(
                            csv_row.get('EquipName'),
                            csv_row.get('EquipSlot')))


def read():

    con = get_connection()
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "Equips.Id AS id, "
                    "EquipName AS equipName, "
                    "EquipSlot AS equipSlot "
                    "FROM Equips")
        return [dict(row) for row in cur.fetchall()]
