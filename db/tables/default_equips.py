# TODO This should become character_outfit_defaults
import sqlite3
from db import get_connection, get_from_datamaster, get_equip_keys
from db.tables import characters, equips

requirements = [
    characters,
    equips
]


def build():
    with get_connection() as con:
        con.row_factory = sqlite3.Row
        cur = con.cursor()

        foreign_keys = get_equip_keys(cur)
        cur.execute("SELECT CharacterName, Id FROM Characters")
        foreign_keys.update({row[0]: row[1] for row in cur.fetchall()})

        cur.execute("PRAGMA foreign_keys = ON")
        cur.execute("DROP TABLE IF EXISTS DefaultEquips")
        cur.execute("CREATE TABLE DefaultEquips("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "Character INTEGER, "
                    "Equip INTEGER, "
                    "FOREIGN KEY(Character) REFERENCES Characters(Id), "
                    "FOREIGN KEY(Equip) REFERENCES Equips(Id))")

        for csv_row in get_from_datamaster('DefaultEquips.csv'):
            cur.execute("INSERT INTO DefaultEquips ("
                        "Character, Equip) "
                        "VALUES (\"{}\", \"{}\")".format(
                            foreign_keys[csv_row.get('CharacterName')],
                            foreign_keys[csv_row.get('EquipName')]))


def read():
    con = get_connection()
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "DefaultEquips.Id AS id, "
                    "CharacterName AS characterName, "
                    "EquipSlotName AS slotName, "
                    "EquipName AS equipName "
                    "FROM DefaultEquips "
                    "JOIN Equips "
                    "ON DefaultEquips.Equip = Equips.Id "
                    "JOIN Characters "
                    "ON DefaultEquips.Character = Characters.Id "
                    "JOIN EquipSlots "
                    "ON Equips.EquipSlot = EquipSlots.Id")
        return [dict(row) for row in cur.fetchall()]
