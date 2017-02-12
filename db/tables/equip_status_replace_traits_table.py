import os
import sqlite3
from db.tables import \
    get_connection, get_from_datamaster, get_equip_keys, \
    equips_table, statuses_table

requirements = [
    equips_table,
    statuses_table
]


def build():
    with get_connection() as con:
        con.row_factory = sqlite3.Row
        cur = con.cursor()

        foreign_keys = get_equip_keys(cur)

        cur.execute("SELECT Id, StatusName FROM Statuses")
        foreign_keys.update({row[1]: row[0] for row in cur.fetchall()})

        cur.execute("PRAGMA foreign_keys = ON")
        cur.execute("DROP TABLE IF EXISTS EquipStatusReplaceTraits")
        cur.execute("CREATE TABLE EquipStatusReplaceTraits("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "Equip INTEGER, "
                    "Status INTEGER, "
                    "FOREIGN KEY(Equip) REFERENCES Equips(Id), "
                    "FOREIGN KEY(Status) REFERENCES Statuses(Id))")

        for csv_row in get_from_datamaster('EquipTraits.csv'):
            if csv_row.get('TraitTypeName') == 'ReplaceInflict':
                cur.execute("INSERT INTO EquipStatusReplaceTraits ("
                            "Equip, Status)"
                            "VALUES (\"{}\", \"{}\")".format(
                                foreign_keys[csv_row.get('EquipName')],
                                foreign_keys[csv_row.get('KeyName')]))


def read():

    con = get_connection()
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "EquipStatusReplaceTraits.Equip AS id, "
                    "StatusName AS statusName "
                    "FROM EquipStatusReplaceTraits "
                    "JOIN Statuses "
                    "WHERE EquipStatusReplaceTraits.Status = Statuses.Id")
        return [dict(row) for row in cur.fetchall()]
