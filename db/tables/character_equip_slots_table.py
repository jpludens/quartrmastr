import sqlite3
from db.tables import get_connection, get_from_datamaster,\
    characters_table, equip_slots_table

requirements = [
    characters_table,
    equip_slots_table
]


def build():
    with get_connection() as con:
        con.row_factory = sqlite3.Row
        cur = con.cursor()

        cur.execute("SELECT CharacterName, Id FROM Characters")
        foreign_keys = {cur_row[0]: cur_row[1]
                        for cur_row in cur.fetchall()}

        cur.execute("SELECT EquipSlotName, Id FROM EquipSlots")
        foreign_keys.update({row[0]: row[1] for row in cur.fetchall()})

        cur.execute("PRAGMA foreign_keys = ON")
        cur.execute("DROP TABLE IF EXISTS CharacterEquipSlots")
        cur.execute("CREATE TABLE CharacterEquipSlots("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "Character INTEGER, "
                    "EquipSlot INTEGER, "
                    "FOREIGN KEY(Character) REFERENCES Characters(Id), "
                    "FOREIGN KEY(EquipSlot) REFERENCES EquipSlots(Id))")

        for csv_row in get_from_datamaster('CharacterEquipSlots.csv'):
            cur.execute("INSERT INTO CharacterEquipSlots ("
                        "Character, EquipSlot) "
                        "VALUES (\"{}\", \"{}\")".format(
                            foreign_keys[csv_row.get('CharacterName')],
                            foreign_keys[csv_row.get('EquipSlotName')]))


def read():
    con = get_connection()
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "CharacterEquipSlots.Id AS id, "
                    "CharacterName AS character, "
                    "EquipSlotName AS slot "
                    "FROM CharacterEquipSlots "
                    "JOIN EquipSlots "
                    "ON CharacterEquipSlots.EquipSlot = EquipSlots.Id "
                    "JOIN Characters "
                    "ON CharacterEquipSlots.Character = Characters.Id")
        return [dict(row) for row in cur.fetchall()]
