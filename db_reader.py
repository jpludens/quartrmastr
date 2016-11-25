import sqlite3
import os


def read_materials():
    db_location = os.path.join('db', 'nolegsbase.db')
    con = sqlite3.connect(db_location)
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "Id AS id, "
                    "MaterialName AS name, "
                    "MaterialPrice AS gold "
                    "FROM Materials")
        return [dict(row) for row in cur.fetchall()]


def read_equips():
    db_location = os.path.join('db', 'nolegsbase.db')
    con = sqlite3.connect(db_location)
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "Equips.Id AS id, "
                    "EquipName AS equipName, "
                    "EquipSlot AS equipSlot "
                    "FROM Equips")
        return [dict(row) for row in cur.fetchall()]


def read_equip_stats():
    db_location = os.path.join('db', 'nolegsbase.db')
    con = sqlite3.connect(db_location)
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "Equips.Id AS id, "
                    "EquipName AS equipName, "
                    "EquipSlot AS equipSlot, "
                    "Level AS level, "
                    "HP AS healthPoints, "
                    "MP AS magicPoints, "
                    "PAttack AS physicalAttack, "
                    "MAttack AS magicAttack, "
                    "PDefence AS physicalDefence, "
                    "MDefence AS magicDefence, "
                    "Accuracy AS accuracy, "
                    "Evade AS evade "
                    "FROM Equips "
                    "JOIN EquipLevels "
                    "ON EquipLevels.Equip = Equips.Id ")
        return [dict(row) for row in cur.fetchall()]


def read_equip_upgrades():
    db_location = os.path.join('db', 'nolegsbase.db')
    con = sqlite3.connect(db_location)
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "Equips.Id AS id, "
                    "Level AS level, "
                    "MaterialName AS materialName, "
                    "Amount AS materialAmount "
                    "FROM Equips "
                    "JOIN EquipLevels "
                    "ON EquipLevels.Equip = Equips.Id "
                    "JOIN EquipUpgradeMaterials "
                    "ON EquipUpgradeMaterials.EquipLevel = EquipLevels.Id "
                    "JOIN Materials "
                    "ON EquipUpgradeMaterials.Material = Materials.Id")
        return [dict(row) for row in cur.fetchall()]


def read_equip_elemental_resistances():
    db_location = os.path.join('db', 'nolegsbase.db')
    con = sqlite3.connect(db_location)
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "EquipResistances.Equip AS id, "
                    "ModifierName AS modifierName, "
                    "Scheme AS scheme "
                    "FROM EquipResistances "
                    "JOIN Modifiers "
                    "WHERE Modifiers.ModifierType = 'Element' "
                    "AND EquipResistances.Modifier = Modifiers.Id")
        return [dict(row) for row in cur.fetchall()]


def read_equip_ailment_resistances():
    db_location = os.path.join('db', 'nolegsbase.db')
    con = sqlite3.connect(db_location)
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "EquipResistances.Equip AS id, "
                    "ModifierName AS modifierName, "
                    "Scheme AS scheme "
                    "FROM EquipResistances "
                    "JOIN Modifiers "
                    "WHERE Modifiers.ModifierType = 'Ailment' "
                    "AND EquipResistances.Modifier = Modifiers.Id")
        return [dict(row) for row in cur.fetchall()]