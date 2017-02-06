import sqlite3
from db import get_connection, get_from_datamaster, get_equip_keys
from db.tables import equips, elements

requirements = [
    equips,
    elements
]


def build():
    with get_connection() as con:
        con.row_factory = sqlite3.Row
        cur = con.cursor()

        foreign_keys = get_equip_keys(cur)

        cur.execute("SELECT Id, StatusName FROM Statuses")
        foreign_keys.update({row[1]: row[0] for row in cur.fetchall()})

        cur.execute("PRAGMA foreign_keys = ON")
        cur.execute("DROP TABLE IF EXISTS EquipStatusResistances")
        cur.execute("CREATE TABLE EquipStatusResistances("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "Equip INTEGER, "
                    "Status INTEGER, "
                    "Scheme TEXT, "
                    "FOREIGN KEY(Equip) REFERENCES Equips(Id), "
                    "FOREIGN KEY(Status) REFERENCES Statuses(Id))")

        for csv_row in get_from_datamaster('EquipResistances.csv'):
            if csv_row.get('Category') == 'Status':
                cur.execute("INSERT INTO EquipStatusResistances ("
                            "Equip, Status, Scheme)"
                            "VALUES (\"{}\", \"{}\", \"{}\")".format(
                                foreign_keys[csv_row.get('EquipName')],
                                foreign_keys[csv_row.get('Resists')],
                                csv_row.get('Scheme')))


def read():
    con = get_connection()
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "EquipStatusResistances.Equip AS equip, "
                    "StatusName AS status, "
                    "Scheme AS scheme "
                    "FROM EquipStatusResistances "
                    "JOIN Statuses "
                    "WHERE EquipStatusResistances.Status = Statuses.Id")
        return [dict(row) for row in cur.fetchall()]


def load():
    resistance_values = {
        '10per': {1: 10, 2: 20, 3: 30, 4: 40, 5: 50},
        '20per': {1: 20, 2: 40, 3: 60, 4: 80, 5: 100},
        '30neg': {1: -30, 2: -30, 3: -30, 4: -30, 5: -30},
        '50neg': {1: -50, 2: -50, 3: -50, 4: -50, 5: -50},
        'ftrip': {1: 10, 2: 20, 3: 30},
        'fhalf': {1: 20, 2: 35, 3: 50},
        'ffull': {1: 40, 2: 70, 3: 100}}
    raw_data = read()
    result = {}
    for row in raw_data:
        equip = row["equip"]
        status = row["status"].upper()  # Shortcut around defining constants
        max_level = 3 if row["scheme"].startswith('f') else 5
        for level in range(1, max_level + 1):
            value = resistance_values[row["scheme"]][level]

            if equip not in result:
                result[equip] = {}
            if level not in result[equip]:
                result[equip][level] = {}
            result[equip][level][status] = value
    return result
