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


def read_equip_upgrade_requirements():
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
                    "JOIN EquipLevelUpgradeRequirements "
                    "ON EquipLevelUpgradeRequirements.EquipLevel = EquipLevels.Id "
                    "JOIN Materials "
                    "ON EquipLevelUpgradeRequirements.Material = Materials.Id")
        return [dict(row) for row in cur.fetchall()]


def read_equip_elemental_resistances():
    db_location = os.path.join('db', 'nolegsbase.db')
    con = sqlite3.connect(db_location)
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "EquipElementalResistances.Equip AS id, "
                    "ElementName AS elementName, "
                    "Scheme AS scheme "
                    "FROM EquipElementalResistances "
                    "JOIN Elements "
                    "WHERE EquipElementalResistances.Element = Elements.Id")
        return [dict(row) for row in cur.fetchall()]


def read_equip_status_resistances():
    db_location = os.path.join('db', 'nolegsbase.db')
    con = sqlite3.connect(db_location)
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "EquipStatusResistances.Equip AS id, "
                    "StatusName AS statusName, "
                    "Scheme AS scheme "
                    "FROM EquipStatusResistances "
                    "JOIN Statuses "
                    "WHERE EquipStatusResistances.Status = Statuses.Id")
        return [dict(row) for row in cur.fetchall()]


def read_equip_element_imbue_traits():
    db_location = os.path.join('db', 'nolegsbase.db')
    con = sqlite3.connect(db_location)
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


def read_equip_element_boost_traits():
    db_location = os.path.join('db', 'nolegsbase.db')
    con = sqlite3.connect(db_location)
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "EquipElementBoostTraits.Equip AS id, "
                    "ElementName AS elementName "
                    "FROM EquipElementBoostTraits "
                    "JOIN Elements "
                    "WHERE EquipElementBoostTraits.Element = Elements.Id")
        return [dict(row) for row in cur.fetchall()]


def read_equip_action_boost_traits():
    db_location = os.path.join('db', 'nolegsbase.db')
    con = sqlite3.connect(db_location)
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "Equip AS id, "
                    "ActionDesc AS actionDesc "
                    "FROM EquipActionBoostTraits")
        return [dict(row) for row in cur.fetchall()]


def read_equip_skill_beat_traits():
    db_location = os.path.join('db', 'nolegsbase.db')
    con = sqlite3.connect(db_location)
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "Equip AS id, "
                    "SkillName AS skillName "
                    "FROM EquipSkillBeatTraits")
        return [dict(row) for row in cur.fetchall()]


def read_equip_skill_stack_traits():
    db_location = os.path.join('db', 'nolegsbase.db')
    con = sqlite3.connect(db_location)
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "Equip AS id, "
                    "SkillName AS skillName "
                    "FROM EquipSkillStackTraits")
        return [dict(row) for row in cur.fetchall()]


def read_equip_skill_counter_traits():
    db_location = os.path.join('db', 'nolegsbase.db')
    con = sqlite3.connect(db_location)
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "Equip AS id, "
                    "SkillName AS skillName "
                    "FROM EquipSkillCounterTraits")
        return [dict(row) for row in cur.fetchall()]


def read_equip_status_on_target_traits():
    db_location = os.path.join('db', 'nolegsbase.db')
    con = sqlite3.connect(db_location)
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "EquipStatusOnTargetTraits.Equip AS id, "
                    "StatusName AS statusName "
                    "FROM EquipStatusOnTargetTraits "
                    "JOIN Statuses "
                    "WHERE EquipStatusOnTargetTraits.Status = Statuses.Id")
        return [dict(row) for row in cur.fetchall()]


def read_equip_status_replace_traits():
    db_location = os.path.join('db', 'nolegsbase.db')
    con = sqlite3.connect(db_location)
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "EquipStatusReplaceTraits.Equip AS id, "
                    "StatusName AS statusName "
                    "FROM EquipStatusReplaceTraits "
                    "JOIN Statuses "
                    "WHERE EquipStatusReplaceTraits.Status = Statuses.Id")
        return [dict(row) for row in cur.fetchall()]


def read_equip_status_on_player_traits():
    db_location = os.path.join('db', 'nolegsbase.db')
    con = sqlite3.connect(db_location)
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "EquipStatusOnPlayerTraits.Equip AS id, "
                    "StatusName AS statusName "
                    "FROM EquipStatusOnPlayerTraits "
                    "JOIN Statuses "
                    "WHERE EquipStatusOnPlayerTraits.Status = Statuses.Id")
        return [dict(row) for row in cur.fetchall()]


def read_equip_drain_traits():
    db_location = os.path.join('db', 'nolegsbase.db')
    con = sqlite3.connect(db_location)
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "EquipDrainTraits.Equip AS id, "
                    "StatName AS statName "
                    "FROM EquipDrainTraits "
                    "JOIN Stats "
                    "WHERE EquipDrainTraits.Stat = Stats.Id")
        return [dict(row) for row in cur.fetchall()]


def read_equip_stat_debuff_traits():
    db_location = os.path.join('db', 'nolegsbase.db')
    con = sqlite3.connect(db_location)
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


def read_equip_buff_reflex_traits():
    db_location = os.path.join('db', 'nolegsbase.db')
    con = sqlite3.connect(db_location)
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "EquipBuffReflexTraits.Equip AS id, "
                    "StatModifierName AS statModifierName "
                    "FROM EquipBuffReflexTraits "
                    "JOIN StatModifiers "
                    "WHERE EquipBuffReflexTraits.StatModifier = StatModifiers.Id")
        return [dict(row) for row in cur.fetchall()]
