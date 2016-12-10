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

        cur.execute("SELECT Id, ElementName FROM Elements")
        foreign_keys.update({row[1]: row[0] for row in cur.fetchall()})

        cur.execute("PRAGMA foreign_keys = ON")
        cur.execute("DROP TABLE IF EXISTS EquipElementImbueTraits")
        cur.execute("CREATE TABLE EquipElementImbueTraits("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "Equip INTEGER, "
                    "Element INTEGER, "
                    "FOREIGN KEY(Equip) REFERENCES Equips(Id), "
                    "FOREIGN KEY(Element) REFERENCES Elements(Id))")

        for csv_row in get_from_datamaster('EquipTraits.csv'):
            if csv_row.get('TraitTypeName') == 'ImbueElement':
                cur.execute("INSERT INTO EquipElementImbueTraits ("
                            "Equip, Element)"
                            "VALUES (\"{}\", \"{}\")".format(
                                foreign_keys[csv_row.get('EquipName')],
                                foreign_keys[csv_row.get('KeyName')]))


def read():

    con = get_connection()
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "EquipElementImbueTraits.Equip AS id, "
                    "ElementName AS elementName "
                    "FROM EquipElementImbueTraits "
                    "JOIN Elements "
                    "WHERE EquipElementImbueTraits.Element = Elements.Id")
        return [dict(row) for row in cur.fetchall()]
