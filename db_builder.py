"""(Re)construct Epic Battle Fantasy 4 data"""

import sqlite3
import csv
import os

db_location = os.path.join('db', 'nolegsbase.db')

def get_from_datamaster(filename):
    filepath = os.path.join(os.getcwd(), 'db', 'datamasters', filename)
    with open(filepath, 'r') as f:
        return [r for r in csv.DictReader(f)]


def get_connection():
    return sqlite3.connect(db_location)


def build_table_equips():
    # No requirements
    with get_connection() as con:
        cur = con.cursor()
        cur.execute("DROP TABLE IF EXISTS Equips")
        cur.execute("CREATE TABLE Equips("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "EquipName TEXT, "
                    "EquipSlot TEXT)")

        for row in get_from_datamaster('Equips.csv'):
            cur.execute("INSERT INTO Equips ("
                        "EquipName, EquipSlot) "
                        "VALUES ('{}', '{}')".format(
                            row['EquipName'],
                            row['EquipSlot']))


def build_table_materials():
    # No requirements
    with get_connection() as con:
        cur = con.cursor()
        cur.execute("DROP TABLE IF EXISTS Materials")
        cur.execute("CREATE TABLE Materials("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "MaterialName TEXT, "
                    "MaterialPrice TEXT)")

        for row in get_from_datamaster('Materials.csv'):
            cur.execute("INSERT INTO Materials ("
                        "MaterialName, MaterialPrice) "
                        "VALUES ('{}', '{}')".format(
                            row['MaterialName'],
                            row['Price']))


def build_table_equip_levels():
    # Requires Equips
    with get_connection() as con:
        con.row_factory = sqlite3.Row
        cur = con.cursor()

        cur.execute("SELECT Id, EquipName FROM Equips")
        foreign_keys = {row['EquipName']: row['Id'] for row in cur.fetchall()}

        cur.execute("PRAGMA foreign_keys = ON")
        cur.execute("DROP TABLE IF EXISTS EquipLevels")
        cur.execute("CREATE TABLE EquipLevels("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "Equip INTEGER, "
                    "Level INTEGER, "
                    "PAttack INTEGER, "
                    "MAttack INTEGER, "
                    "PDefense INTEGER, "
                    "MDefense INTEGER, "
                    "FOREIGN KEY(Equip) REFERENCES Equips(Id))")

        for row in get_from_datamaster('EquipLevels.csv'):
            cur.execute("INSERT INTO EquipLevels ("
                        "Equip, Level, PAttack, MAttack, PDefense, MDefense) "
                        "VALUES ('{}', '{}', '{}', '{}', '{}', '{}')".format(
                            foreign_keys[row['EquipName']],
                            row['Level'],
                            row['PAttack'],
                            row['MAttack'],
                            row['PDefense'],
                            row['MDefense']))


def build_table_equip_upgrade_components():
    # Requires EquipLevels, Materials
    def get_equip_level_tag(row):
        return row['EquipName'] + str(row['Level'])

    with get_connection() as con:
        con.row_factory = sqlite3.Row
        cur = con.cursor()

        cur.execute("SELECT EquipLevels.Id, EquipName, Level FROM Equips "
                    "JOIN EquipLevels ON EquipLevels.Equip = Equips.Id")
        foreign_keys = {get_equip_level_tag(row): row['Id']
                        for row in cur.fetchall()}

        cur.execute("SELECT Id, MaterialName FROM Materials")
        foreign_keys.update({row['MaterialName']: row['Id']
                             for row in cur.fetchall()})

        cur.execute("PRAGMA foreign_keys = ON")
        cur.execute("DROP TABLE IF EXISTS EquipUpgradeMaterials")
        cur.execute("CREATE TABLE EquipUpgradeMaterials("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "EquipLevel INTEGER, "
                    "Material INTEGER, "
                    "Amount INTEGER, "
                    "FOREIGN KEY(EquipLevel) REFERENCES EquipLevels(Id), "
                    "FOREIGN KEY(Material) REFERENCES Materials(Id))")

        for row in get_from_datamaster('EquipUpgradeMaterials.csv'):
            cur.execute("INSERT INTO EquipUpgradeMaterials ("
                        "EquipLevel, Material, Amount) "
                        "VALUES ('{}', '{}', '{}')".format(
                            foreign_keys[get_equip_level_tag(row)],
                            foreign_keys[row['MaterialName']],
                            row['Amount']))


if __name__ == "__main__":
    build_table_equips()
    build_table_materials()
    build_table_equip_levels()
    build_table_equip_upgrade_components()
