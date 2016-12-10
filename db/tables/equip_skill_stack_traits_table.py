import os
import sqlite3
from db.tables import \
    get_connection, get_from_datamaster, get_equip_keys, \
    equips_table

requirements = [
    equips_table
    # Will require skills if implemented
]


def build():
    with get_connection() as con:
        con.row_factory = sqlite3.Row
        cur = con.cursor()

        foreign_keys = get_equip_keys(cur)

        cur.execute("PRAGMA foreign_keys = ON")
        cur.execute("DROP TABLE IF EXISTS EquipSkillStackTraits")
        cur.execute("CREATE TABLE EquipSkillStackTraits("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "Equip INTEGER, "
                    "SkillName TEXT, "
                    "FOREIGN KEY(Equip) REFERENCES Equips(Id))")

        for csv_row in get_from_datamaster('EquipTraits.csv'):
            if csv_row.get('TraitTypeName') == 'StackSkill':
                cur.execute("INSERT INTO EquipSkillStackTraits ("
                            "Equip, SkillName)"
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
                    "SkillName AS skillName "
                    "FROM EquipSkillStackTraits")
        return [dict(row) for row in cur.fetchall()]
