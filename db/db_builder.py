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
                    "MaterialPrice INTEGER)")

        for row in get_from_datamaster('Materials.csv'):
            cur.execute("INSERT INTO Materials ("
                        "MaterialName, MaterialPrice) "
                        "VALUES ('{}', '{}')".format(
                            row['MaterialName'],
                            # TODO: Change this. ItemPrice? ShopPrice? PurchaseCost?
                            row['Price']))


def build_table_modifiers():
    # No requirements
    with get_connection() as con:
        cur = con.cursor()
        cur.execute("DROP TABLE IF EXISTS Modifiers")
        cur.execute("CREATE TABLE Modifiers("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "ModifierName TEXT, "
                    "ModifierType TEXT)")

        for row in get_from_datamaster('Modifiers.csv'):
            cur.execute("INSERT INTO Modifiers ("
                        "ModifierName, ModifierType) "
                        "VALUES ('{}', '{}')".format(
                            row['ModifierName'],
                            row['ModifierType']))


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
                    "HP INTEGER, "
                    "MP INTEGER, "
                    "PAttack INTEGER, "
                    "MAttack INTEGER, "
                    "PDefence INTEGER, "
                    "MDefence INTEGER, "
                    "Accuracy INTEGER, "
                    "Evade INTEGER, "
                    "FOREIGN KEY(Equip) REFERENCES Equips(Id))")

        for row in get_from_datamaster('EquipLevels.csv'):
            cur.execute("INSERT INTO EquipLevels ("
                        "Equip, Level, HP, MP, PAttack, MAttack, "
                        "PDefence, MDefence, Accuracy, Evade) "
                        "VALUES ('{}', '{}', '{}', '{}', '{}', '{}', "
                        "'{}', '{}', '{}', '{}')".format(
                            foreign_keys[row['EquipName']],
                            row['Level'],
                            row['HP'],
                            row['MP'],
                            row['PAttack'],
                            row['MAttack'],
                            row['PDefence'],
                            row['MDefence'],
                            row['Accuracy'],
                            row['Evade']))


def build_table_equip_resistances():
    # Requires Equips, Modifiers
    with get_connection() as con:
        con.row_factory = sqlite3.Row
        cur = con.cursor()

        cur.execute("SELECT Id, EquipName FROM Equips")
        foreign_keys = {row['EquipName']: row['Id'] for row in cur.fetchall()}

        # Get foreign keys for Element and Ailment modifiers.
        # Handle Poison as a special case.
        cur.execute("SELECT Id, ModifierName, ModifierType FROM Modifiers")
        for row in cur.fetchall():
            modifier_key = row['ModifierName']
            if modifier_key == "Poison":
                if row['ModifierType'] == "Element":
                    modifier_key = "PoisonE"
                elif row['ModifierType'] == "Ailment":
                    modifier_key = "PoisonA"
                else:
                    raise ValueError("ModifierType for ModifierName 'Poison' "
                                     "must be 'Element' or 'Ailment'")
            foreign_keys[modifier_key] = row['Id']

        cur.execute("PRAGMA foreign_keys = ON")
        cur.execute("DROP TABLE IF EXISTS EquipResistances")
        cur.execute("CREATE TABLE EquipResistances("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "Equip INTEGER, "
                    "Modifier INTEGER, "
                    "Scheme TEXT, "
                    "FOREIGN KEY(Equip) REFERENCES Equips(Id), "
                    "FOREIGN KEY(Modifier) REFERENCES Modifiers(Id))")

        for row in get_from_datamaster('EquipResistances.csv'):
            cur.execute("INSERT INTO EquipResistances ("
                        "Equip, Modifier, Scheme)"
                        "VALUES ('{}', '{}', '{}')".format(
                            foreign_keys[row['EquipName']],
                            foreign_keys[row['Modifier']],
                            row['Scheme']))


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
    build_table_modifiers()
    build_table_equip_levels()
    build_table_equip_resistances()
    build_table_equip_upgrade_components()
