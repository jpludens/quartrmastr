import os
import sqlite3
from db.tables import\
    get_connection, get_from_datamaster, get_equip_keys, \
    equips_table, stats_table

requirements = [
    equips_table,
    stats_table
]


def build():
    # Requires Equips, Stats
    with get_connection() as con:
        con.row_factory = sqlite3.Row
        cur = con.cursor()

        foreign_keys = get_equip_keys(cur)

        cur.execute("SELECT Id, StatName FROM Stats")
        foreign_keys.update({row[1]: row[0] for row in cur.fetchall()})

        cur.execute("PRAGMA foreign_keys = ON")
        cur.execute("DROP TABLE IF EXISTS EquipDrainTraits")
        cur.execute("CREATE TABLE EquipDrainTraits("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "Equip INTEGER, "
                    "Stat INTEGER, "
                    "FOREIGN KEY(Equip) REFERENCES Equips(Id), "
                    "FOREIGN KEY(Stat) REFERENCES Stats(Id))")

        for csv_row in get_from_datamaster('EquipTraits.csv'):
            if csv_row.get('TraitTypeName') == 'DrainTarget':
                cur.execute("INSERT INTO EquipDrainTraits ("
                            "Equip, Stat)"
                            "VALUES (\"{}\", \"{}\")".format(
                                foreign_keys[csv_row.get('EquipName')],
                                foreign_keys[csv_row.get('KeyName')]))


def read():

    con = get_connection()
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "EquipDrainTraits.Equip AS id, "
                    "StatName AS statName "
                    "FROM EquipDrainTraits "
                    "JOIN Stats "
                    "WHERE EquipDrainTraits.Stat = Stats.Id")
        return [dict(row) for row in cur.fetchall()]
