import sqlite3
from db import get_connection, get_from_datamaster
from db.tables import equip_slots

requirements = [
    equip_slots
]


def build():
    with get_connection() as con:
        cur = con.cursor()

        cur.execute("SELECT EquipSlotName, Id FROM EquipSlots")
        foreign_keys = {cur_row[0]: cur_row[1]
                        for cur_row in cur.fetchall()}

        cur.execute("PRAGMA foreign_keys = ON")
        cur.execute("DROP TABLE IF EXISTS Equips")
        cur.execute("CREATE TABLE Equips("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "EquipName TEXT, "
                    "EquipSlot TEXT, "
                    "FOREIGN KEY(EquipSlot) REFERENCES EquipSlots(Id))")

        for csv_row in get_from_datamaster('Equips.csv'):
            cur.execute("INSERT INTO Equips ("
                        "EquipName, EquipSlot) "
                        "VALUES (\"{}\", \"{}\")".format(
                            csv_row.get('EquipName'),
                            foreign_keys[csv_row.get('EquipSlotName')]))


def read():
    con = get_connection()
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "Equips.Id AS id, "
                    "EquipName AS name, "
                    "EquipSlotName AS slot, "
                    "EquipSlotTypeName AS type "
                    "FROM Equips "
                    "JOIN EquipSlots "
                    "ON Equips.EquipSlot = EquipSlots.Id "
                    "JOIN EquipSlotTypes "
                    "ON EquipSlots.EquipSlotType = EquipSlotTypes.Id")
        return [dict(row) for row in cur.fetchall()]
