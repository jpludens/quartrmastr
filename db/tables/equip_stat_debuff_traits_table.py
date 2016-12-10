import os
import sqlite3
from db.tables import \
    get_connection, get_from_datamaster, get_equip_keys, \
    equips_table, stat_modifiers_table

requirements = [
    equips_table,
    stat_modifiers_table
]

def build():
    with get_connection() as con:
        con.row_factory = sqlite3.Row
        cur = con.cursor()

        foreign_keys = get_equip_keys(cur)

        cur.execute("SELECT Id, StatModifierName FROM StatModifiers")
        foreign_keys.update({row[1]: row[0] for row in cur.fetchall()})

        cur.execute("PRAGMA foreign_keys = ON")
        cur.execute("DROP TABLE IF EXISTS EquipStatDebuffTraits")
        cur.execute("CREATE TABLE EquipStatDebuffTraits("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "Equip INTEGER, "
                    "StatModifier INTEGER, "
                    "FOREIGN KEY(Equip) REFERENCES Equips(Id), "
                    "FOREIGN KEY(StatModifier) REFERENCES StatModifiers(Id))")

        for csv_row in get_from_datamaster('EquipTraits.csv'):
            if csv_row.get('TraitTypeName') == 'DebuffTarget':
                cur.execute("INSERT INTO EquipStatDebuffTraits ("
                            "Equip, StatModifier)"
                            "VALUES (\"{}\", \"{}\")".format(
                                foreign_keys[csv_row.get('EquipName')],
                                foreign_keys[csv_row.get('KeyName')]))


def read():

    con = get_connection()
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "EquipStatDebuffTraits.Equip AS id, "
                    "StatModifierName AS statModifierName "
                    "FROM EquipStatDebuffTraits "
                    "JOIN StatModifiers "
                    "WHERE EquipStatDebuffTraits.StatModifier = StatModifiers.Id")
        return [dict(row) for row in cur.fetchall()]
