import sqlite3
from db import get_connection, get_from_datamaster
from db.tables import equip_slot_types

requirements = [equip_slot_types]


def build():
    with get_connection() as con:
        con.row_factory = sqlite3.Row
        cur = con.cursor()

        cur.execute("SELECT EquipSlotTypeName, Id FROM EquipSlotTypes")
        foreign_keys = {cur_row[0]: cur_row[1]
                        for cur_row in cur.fetchall()}

        cur.execute("PRAGMA foreign_keys = ON")
        cur.execute("DROP TABLE IF EXISTS EquipSlots")
        cur.execute("CREATE TABLE EquipSlots("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "EquipSlotType INTEGER, "
                    "EquipSlotName TEXT, "
                    "FOREIGN KEY(EquipSlotType) REFERENCES EquipSlotTypes(Id))")

        for csv_row in get_from_datamaster('EquipSlots.csv'):
            cur.execute("INSERT INTO EquipSlots ("
                        "EquipSlotType, EquipSlotName)"
                        "VALUES (\"{}\", \"{}\")".format(
                            foreign_keys[csv_row.get('EquipSlotTypeName')],
                            csv_row.get('EquipSlotName')))


def read():
    con = get_connection()
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "EquipSlots.Id AS id, "
                    "EquipSlotName AS slotName, "
                    "EquipSlotTypeName AS slotType "
                    "FROM EquipSlots "
                    "JOIN EquipSlotTypes "
                    "WHERE EquipSlots.EquipSlotType = EquipSlotTypes.Id")
        return [dict(row) for row in cur.fetchall()]
