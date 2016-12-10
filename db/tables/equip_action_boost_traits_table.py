import os
import sqlite3
from db.tables import \
    get_connection, get_from_datamaster, get_equip_keys, \
    equips_table

requirements = [
    equips_table
]


def build():
    # Requires Equips, (Skills)
    with get_connection() as con:
        con.row_factory = sqlite3.Row
        cur = con.cursor()

        foreign_keys = get_equip_keys(cur)

        cur.execute("PRAGMA foreign_keys = ON")
        cur.execute("DROP TABLE IF EXISTS EquipActionBoostTraits")
        cur.execute("CREATE TABLE EquipActionBoostTraits("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "Equip INTEGER, "
                    "ActionDesc TEXT, "
                    "FOREIGN KEY(Equip) REFERENCES Equips(Id))")

        for csv_row in get_from_datamaster('EquipTraits.csv'):
            if csv_row.get('TraitTypeName') == 'ActionBoost':
                cur.execute("INSERT INTO EquipActionBoostTraits ("
                            "Equip, ActionDesc)"
                            "VALUES (\"{}\", \"{}\")".format(
                                foreign_keys[csv_row.get('EquipName')],
                                csv_row.get('KeyName')))


def read():

    con = get_connection()
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "Equip AS id, "
                    "ActionDesc AS actionDesc "
                    "FROM EquipActionBoostTraits")
        return [dict(row) for row in cur.fetchall()]
