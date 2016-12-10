import os
import sqlite3
from db.tables import \
    get_connection, get_from_datamaster, get_equip_keys, \
    equips_table, elements_table

requirements = [
    equips_table,
    elements_table
]


def build():
    with get_connection() as con:
        con.row_factory = sqlite3.Row
        cur = con.cursor()

        foreign_keys = get_equip_keys(cur)

        cur.execute("SELECT Id, StatusName FROM Statuses")
        foreign_keys.update({row[1]: row[0] for row in cur.fetchall()})

        cur.execute("PRAGMA foreign_keys = ON")
        cur.execute("DROP TABLE IF EXISTS EquipStatusResistances")
        cur.execute("CREATE TABLE EquipStatusResistances("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "Equip INTEGER, "
                    "Status INTEGER, "
                    "Scheme TEXT, "
                    "FOREIGN KEY(Equip) REFERENCES Equips(Id), "
                    "FOREIGN KEY(Status) REFERENCES Statuses(Id))")

        for csv_row in get_from_datamaster('EquipResistances.csv'):
            if csv_row.get('Category') == 'Status':
                cur.execute("INSERT INTO EquipStatusResistances ("
                            "Equip, Status, Scheme)"
                            "VALUES (\"{}\", \"{}\", \"{}\")".format(
                                foreign_keys[csv_row.get('EquipName')],
                                foreign_keys[csv_row.get('Resists')],
                                csv_row.get('Scheme')))


def read():

    con = get_connection()
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "EquipStatusResistances.Equip AS id, "
                    "StatusName AS statusName, "
                    "Scheme AS scheme "
                    "FROM EquipStatusResistances "
                    "JOIN Statuses "
                    "WHERE EquipStatusResistances.Status = Statuses.Id")
        return [dict(row) for row in cur.fetchall()]