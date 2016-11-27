"""(Re)construct Epic Battle Fantasy 4 data"""

import sqlite3
import csv
import os


def get_from_datamaster(filename):
    filepath = os.path.join(os.getcwd(), 'db', 'datamasters', filename)
    with open(filepath, 'r') as f:
        return [r for r in csv.DictReader(f)]


def get_equip_keys(cursor):
    cursor.execute("SELECT EquipName, Id FROM Equips")
    return {equip_row[0]: equip_row[1]
            for equip_row in cursor.fetchall()}


def build_stats():
    # No requirements
    with sqlite3.connect(os.path.join('db', 'nolegsbase.db')) as con:
        cur = con.cursor()
        cur.execute("DROP TABLE IF EXISTS Stats")
        cur.execute("CREATE TABLE Stats("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "StatName TEXT)")

        for csv_row in get_from_datamaster('Stats.csv'):
            cur.execute("INSERT INTO Stats ("
                        "StatName) "
                        "VALUES (\"{}\")".format(
                            csv_row.get('StatName')))


def build_stat_modifiers():
    # Requires Stats
    with sqlite3.connect(os.path.join('db', 'nolegsbase.db')) as con:
        cur = con.cursor()
        cur.execute("DROP TABLE IF EXISTS StatModifiers")
        cur.execute("CREATE TABLE StatModifiers("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "StatModifierName TEXT, "
                    "StatModifierType TEXT)")

        for csv_row in get_from_datamaster('StatModifiers.csv'):
            cur.execute("INSERT INTO StatModifiers ("
                        "StatModifierName, StatModifierType) "
                        "VALUES (\"{}\", \"{}\")".format(
                            csv_row.get('StatModifierName'),
                            csv_row.get('StatModifierType')))


def build_elements():
    # No requirements
    with sqlite3.connect(os.path.join('db', 'nolegsbase.db')) as con:
        cur = con.cursor()
        cur.execute("DROP TABLE IF EXISTS Elements")
        cur.execute("CREATE TABLE Elements("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "ElementName TEXT)")

        for csv_row in get_from_datamaster('Elements.csv'):
            cur.execute("INSERT INTO Elements ("
                        "ElementName) "
                        "VALUES (\"{}\")".format(
                            csv_row.get('ElementName')))


def build_statuses():
    # No requirements
    with sqlite3.connect(os.path.join('db', 'nolegsbase.db')) as con:
        cur = con.cursor()
        cur.execute("DROP TABLE IF EXISTS Statuses")
        cur.execute("CREATE TABLE Statuses("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "StatusName TEXT, "
                    "StatusType TEXT)")

        for csv_row in get_from_datamaster('Statuses.csv'):
            cur.execute("INSERT INTO Statuses ("
                        "StatusName, StatusType) "
                        "VALUES (\"{}\", \"{}\")".format(
                            csv_row.get('StatusName'),
                            csv_row.get('StatusType')))


def build_equips():
    # No requirements
    with sqlite3.connect(os.path.join('db', 'nolegsbase.db')) as con:
        cur = con.cursor()
        cur.execute("DROP TABLE IF EXISTS Equips")
        cur.execute("CREATE TABLE Equips("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "EquipName TEXT, "
                    "EquipSlot TEXT)")

        for csv_row in get_from_datamaster('Equips.csv'):
            cur.execute("INSERT INTO Equips ("
                        "EquipName, EquipSlot) "
                        "VALUES (\"{}\", \"{}\")".format(
                            csv_row.get('EquipName'),
                            csv_row.get('EquipSlot')))


def build_materials():
    # No requirements
    with sqlite3.connect(os.path.join('db', 'nolegsbase.db')) as con:
        cur = con.cursor()
        cur.execute("DROP TABLE IF EXISTS Materials")
        cur.execute("CREATE TABLE Materials("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "MaterialName TEXT, "
                    "MaterialPrice INTEGER)")

        for csv_row in get_from_datamaster('Materials.csv'):
            cur.execute("INSERT INTO Materials ("
                        "MaterialName, MaterialPrice) "
                        "VALUES (\"{}\", \"{}\")".format(
                            csv_row.get('MaterialName'),
                            # TODO: Change this. ItemPrice? ShopPrice? PurchaseCost?
                            csv_row.get('Price')))


def build_equip_level_stats():
    # Requires Equips
    with sqlite3.connect(os.path.join('db', 'nolegsbase.db')) as con:
        con.row_factory = sqlite3.Row
        cur = con.cursor()

        foreign_keys = get_equip_keys(cur)

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

        for csv_row in get_from_datamaster('EquipLevelStats.csv'):
            cur.execute("INSERT INTO EquipLevels ("
                        "Equip, Level, HP, MP, PAttack, MAttack, "
                        "PDefence, MDefence, Accuracy, Evade) "
                        "VALUES (\"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", "
                        "\"{}\", \"{}\", \"{}\", \"{}\")".format(
                            foreign_keys[csv_row.get('EquipName')],
                            csv_row.get('Level'),
                            csv_row.get('HP'),
                            csv_row.get('MP'),
                            csv_row.get('PAttack'),
                            csv_row.get('MAttack'),
                            csv_row.get('PDefence'),
                            csv_row.get('MDefence'),
                            csv_row.get('Accuracy'),
                            csv_row.get('Evade')))


def build_equip_elemental_resistances():
    # Requires Equips, Elements
    with sqlite3.connect(os.path.join('db', 'nolegsbase.db')) as con:
        con.row_factory = sqlite3.Row
        cur = con.cursor()

        foreign_keys = get_equip_keys(cur)

        cur.execute("SELECT Id, ElementName FROM Elements")
        foreign_keys.update({row[1]: row[0] for row in cur.fetchall()})

        cur.execute("PRAGMA foreign_keys = ON")
        cur.execute("DROP TABLE IF EXISTS EquipElementalResistances")
        cur.execute("CREATE TABLE EquipElementalResistances("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "Equip INTEGER, "
                    "Element INTEGER, "
                    "Scheme TEXT, "
                    "FOREIGN KEY(Equip) REFERENCES Equips(Id), "
                    "FOREIGN KEY(Element) REFERENCES Elements(Id))")

        for csv_row in get_from_datamaster('EquipResistances.csv'):
            if csv_row.get('Category') == 'Element':
                cur.execute("INSERT INTO EquipElementalResistances ("
                            "Equip, Element, Scheme)"
                            "VALUES (\"{}\", \"{}\", \"{}\")".format(
                                foreign_keys[csv_row.get('EquipName')],
                                foreign_keys[csv_row.get('Resists')],
                                csv_row.get('Scheme')))


def build_equip_status_resistances():
    # Requires Equips, Statuses
    with sqlite3.connect(os.path.join('db', 'nolegsbase.db')) as con:
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


def build_equip_element_imbue_traits():
    # Requires Equips, Elements
    with sqlite3.connect(os.path.join('db', 'nolegsbase.db')) as con:
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


def build_equip_element_boost_traits():
    # Requires Equips, Elements
    with sqlite3.connect(os.path.join('db', 'nolegsbase.db')) as con:
        con.row_factory = sqlite3.Row
        cur = con.cursor()

        foreign_keys = get_equip_keys(cur)

        cur.execute("SELECT Id, ElementName FROM Elements")
        foreign_keys.update({row[1]: row[0] for row in cur.fetchall()})

        cur.execute("PRAGMA foreign_keys = ON")
        cur.execute("DROP TABLE IF EXISTS EquipElementBoostTraits")
        cur.execute("CREATE TABLE EquipElementBoostTraits("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "Equip INTEGER, "
                    "Element INTEGER, "
                    "FOREIGN KEY(Equip) REFERENCES Equips(Id), "
                    "FOREIGN KEY(Element) REFERENCES Elements(Id))")

        for csv_row in get_from_datamaster('EquipTraits.csv'):
            if csv_row.get('TraitTypeName') == 'BoostElement':
                cur.execute("INSERT INTO EquipElementBoostTraits ("
                            "Equip, Element)"
                            "VALUES (\"{}\", \"{}\")".format(
                                foreign_keys[csv_row.get('EquipName')],
                                foreign_keys[csv_row.get('KeyName')]))


def build_equip_stat_debuff_traits():
    # Requires Equips, StatModifiers
    with sqlite3.connect(os.path.join('db', 'nolegsbase.db')) as con:
        con.row_factory = sqlite3.Row
        cur = con.cursor()

        foreign_keys = get_equip_keys(cur)

        cur.execute("SELECT Id, StatModifierName FROM StatModifiers")
        foreign_keys.update({row[1]: row[0] for row in cur.fetchall()})

        cur.execute("PRAGMA foreign_keys = ON")
        cur.execute("DROP TABLE IF EXISTS EquipStatDebuffTraits")
        cur.execute("CREATE TABLE EquipStatDebuffTraits("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "Equip INTEGER, "
                    "StatModifier INTEGER, "
                    "FOREIGN KEY(Equip) REFERENCES Equips(Id), "
                    "FOREIGN KEY(StatModifier) REFERENCES StatModifiers(Id))")

        for csv_row in get_from_datamaster('EquipTraits.csv'):
            if csv_row.get('TraitTypeName') == 'DebuffTarget':
                cur.execute("INSERT INTO EquipStatDebuffTraits ("
                            "Equip, StatModifier)"
                            "VALUES (\"{}\", \"{}\")".format(
                                foreign_keys[csv_row.get('EquipName')],
                                foreign_keys[csv_row.get('KeyName')]))


def build_equip_buff_reflex_traits():
    # Requires Equips, StatModifiers
    with sqlite3.connect(os.path.join('db', 'nolegsbase.db')) as con:
        con.row_factory = sqlite3.Row
        cur = con.cursor()

        foreign_keys = get_equip_keys(cur)

        cur.execute("SELECT Id, StatModifierName FROM StatModifiers")
        foreign_keys.update({row[1]: row[0] for row in cur.fetchall()})

        cur.execute("PRAGMA foreign_keys = ON")
        cur.execute("DROP TABLE IF EXISTS EquipBuffReflexTraits")
        cur.execute("CREATE TABLE EquipBuffReflexTraits("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "Equip INTEGER, "
                    "StatModifier INTEGER, "
                    "FOREIGN KEY(Equip) REFERENCES Equips(Id), "
                    "FOREIGN KEY(StatModifier) REFERENCES StatModifiers(Id))")

        for csv_row in get_from_datamaster('EquipTraits.csv'):
            if csv_row.get('TraitTypeName') == 'BuffReflex':
                cur.execute("INSERT INTO EquipBuffReflexTraits ("
                            "Equip, StatModifier)"
                            "VALUES (\"{}\", \"{}\")".format(
                                foreign_keys[csv_row.get('EquipName')],
                                foreign_keys[csv_row.get('KeyName')]))


def build_equip_skill_beat_traits():
    # Requires Equips, (Skills)
    with sqlite3.connect(os.path.join('db', 'nolegsbase.db')) as con:
        con.row_factory = sqlite3.Row
        cur = con.cursor()

        foreign_keys = get_equip_keys(cur)

        cur.execute("PRAGMA foreign_keys = ON")
        cur.execute("DROP TABLE IF EXISTS EquipSkillBeatTraits")
        cur.execute("CREATE TABLE EquipSkillBeatTraits("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "Equip INTEGER, "
                    "SkillName TEXT, "
                    "FOREIGN KEY(Equip) REFERENCES Equips(Id))")

        for csv_row in get_from_datamaster('EquipTraits.csv'):
            if csv_row.get('TraitTypeName') == 'BeatSkill':
                cur.execute("INSERT INTO EquipSkillBeatTraits ("
                            "Equip, SkillName)"
                            "VALUES (\"{}\", \"{}\")".format(
                                foreign_keys[csv_row.get('EquipName')],
                                csv_row.get('KeyName')))


def build_equip_skill_stack_traits():
    # Requires Equips, (Skills)
    with sqlite3.connect(os.path.join('db', 'nolegsbase.db')) as con:
        con.row_factory = sqlite3.Row
        cur = con.cursor()

        foreign_keys = get_equip_keys(cur)

        cur.execute("PRAGMA foreign_keys = ON")
        cur.execute("DROP TABLE IF EXISTS EquipSkillStackTraits")
        cur.execute("CREATE TABLE EquipSkillStackTraits("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "Equip INTEGER, "
                    "SkillName TEXT, "
                    "FOREIGN KEY(Equip) REFERENCES Equips(Id))")

        for csv_row in get_from_datamaster('EquipTraits.csv'):
            if csv_row.get('TraitTypeName') == 'StackSkill':
                cur.execute("INSERT INTO EquipSkillStackTraits ("
                            "Equip, SkillName)"
                            "VALUES (\"{}\", \"{}\")".format(
                                foreign_keys[csv_row.get('EquipName')],
                                csv_row.get('KeyName')))


def build_equip_skill_counter_traits():
    # Requires Equips, (Skills)
    with sqlite3.connect(os.path.join('db', 'nolegsbase.db')) as con:
        con.row_factory = sqlite3.Row
        cur = con.cursor()

        foreign_keys = get_equip_keys(cur)

        cur.execute("PRAGMA foreign_keys = ON")
        cur.execute("DROP TABLE IF EXISTS EquipSkillCounterTraits")
        cur.execute("CREATE TABLE EquipSkillCounterTraits("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "Equip INTEGER, "
                    "SkillName TEXT, "
                    "FOREIGN KEY(Equip) REFERENCES Equips(Id))")

        for csv_row in get_from_datamaster('EquipTraits.csv'):
            if csv_row.get('TraitTypeName') == 'CounterSkill':
                cur.execute("INSERT INTO EquipSkillCounterTraits ("
                            "Equip, SkillName)"
                            "VALUES (\"{}\", \"{}\")".format(
                                foreign_keys[csv_row.get('EquipName')],
                                csv_row.get('KeyName')))


def build_equip_status_on_target_traits():
    # Requires Equips, Statuses
    with sqlite3.connect(os.path.join('db', 'nolegsbase.db')) as con:
        con.row_factory = sqlite3.Row
        cur = con.cursor()

        foreign_keys = get_equip_keys(cur)

        cur.execute("SELECT Id, StatusName FROM Statuses")
        foreign_keys.update({row[1]: row[0] for row in cur.fetchall()})

        cur.execute("PRAGMA foreign_keys = ON")
        cur.execute("DROP TABLE IF EXISTS EquipStatusOnTargetTraits")
        cur.execute("CREATE TABLE EquipStatusOnTargetTraits("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "Equip INTEGER, "
                    "Status INTEGER, "
                    "FOREIGN KEY(Equip) REFERENCES Equips(Id), "
                    "FOREIGN KEY(Status) REFERENCES Statuses(Id))")

        for csv_row in get_from_datamaster('EquipTraits.csv'):
            if csv_row.get('TraitTypeName') == 'InflictTarget':
                cur.execute("INSERT INTO EquipStatusOnTargetTraits ("
                            "Equip, Status)"
                            "VALUES (\"{}\", \"{}\")".format(
                                foreign_keys[csv_row.get('EquipName')],
                                foreign_keys[csv_row.get('KeyName')]))


def build_equip_status_on_player_traits():
    # Requires Equips, Statuses
    with sqlite3.connect(os.path.join('db', 'nolegsbase.db')) as con:
        con.row_factory = sqlite3.Row
        cur = con.cursor()

        foreign_keys = get_equip_keys(cur)

        cur.execute("SELECT Id, StatusName FROM Statuses")
        foreign_keys.update({row[1]: row[0] for row in cur.fetchall()})

        cur.execute("PRAGMA foreign_keys = ON")
        cur.execute("DROP TABLE IF EXISTS EquipStatusOnPlayerTraits")
        cur.execute("CREATE TABLE EquipStatusOnPlayerTraits("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "Equip INTEGER, "
                    "Status INTEGER, "
                    "FOREIGN KEY(Equip) REFERENCES Equips(Id), "
                    "FOREIGN KEY(Status) REFERENCES Statuses(Id))")

        for csv_row in get_from_datamaster('EquipTraits.csv'):
            if csv_row.get('TraitTypeName') == 'BestowPlayer':
                cur.execute("INSERT INTO EquipStatusOnPlayerTraits ("
                            "Equip, Status)"
                            "VALUES (\"{}\", \"{}\")".format(
                                foreign_keys[csv_row.get('EquipName')],
                                foreign_keys[csv_row.get('KeyName')]))


def build_equip_status_replace_traits():
    # Requires Equips, Statuses
    with sqlite3.connect(os.path.join('db', 'nolegsbase.db')) as con:
        con.row_factory = sqlite3.Row
        cur = con.cursor()

        foreign_keys = get_equip_keys(cur)

        cur.execute("SELECT Id, StatusName FROM Statuses")
        foreign_keys.update({row[1]: row[0] for row in cur.fetchall()})

        cur.execute("PRAGMA foreign_keys = ON")
        cur.execute("DROP TABLE IF EXISTS EquipStatusReplaceTraits")
        cur.execute("CREATE TABLE EquipStatusReplaceTraits("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "Equip INTEGER, "
                    "Status INTEGER, "
                    "FOREIGN KEY(Equip) REFERENCES Equips(Id), "
                    "FOREIGN KEY(Status) REFERENCES Statuses(Id))")

        for csv_row in get_from_datamaster('EquipTraits.csv'):
            if csv_row.get('TraitTypeName') == 'ReplaceInflict':
                cur.execute("INSERT INTO EquipStatusReplaceTraits ("
                            "Equip, Status)"
                            "VALUES (\"{}\", \"{}\")".format(
                                foreign_keys[csv_row.get('EquipName')],
                                foreign_keys[csv_row.get('KeyName')]))


def build_equip_drain_traits():
    # Requires Equips, Stats
    with sqlite3.connect(os.path.join('db', 'nolegsbase.db')) as con:
        con.row_factory = sqlite3.Row
        cur = con.cursor()

        foreign_keys = get_equip_keys(cur)

        cur.execute("SELECT Id, StatName FROM Stats")
        foreign_keys.update({row[1]: row[0] for row in cur.fetchall()})

        cur.execute("PRAGMA foreign_keys = ON")
        cur.execute("DROP TABLE IF EXISTS EquipDrainTraits")
        cur.execute("CREATE TABLE EquipDrainTraits("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "Equip INTEGER, "
                    "Stat INTEGER, "
                    "FOREIGN KEY(Equip) REFERENCES Equips(Id), "
                    "FOREIGN KEY(Stat) REFERENCES Stats(Id))")

        for csv_row in get_from_datamaster('EquipTraits.csv'):
            if csv_row.get('TraitTypeName') == 'DrainTarget':
                cur.execute("INSERT INTO EquipDrainTraits ("
                            "Equip, Stat)"
                            "VALUES (\"{}\", \"{}\")".format(
                                foreign_keys[csv_row.get('EquipName')],
                                foreign_keys[csv_row.get('KeyName')]))


def build_equip_action_boost_traits():
    # Requires Equips, (Skills)
    with sqlite3.connect(os.path.join('db', 'nolegsbase.db')) as con:
        con.row_factory = sqlite3.Row
        cur = con.cursor()

        foreign_keys = get_equip_keys(cur)

        cur.execute("PRAGMA foreign_keys = ON")
        cur.execute("DROP TABLE IF EXISTS EquipActionBoostTraits")
        cur.execute("CREATE TABLE EquipActionBoostTraits("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "Equip INTEGER, "
                    "ActionDesc TEXT, "
                    "FOREIGN KEY(Equip) REFERENCES Equips(Id))")

        for csv_row in get_from_datamaster('EquipTraits.csv'):
            if csv_row.get('TraitTypeName') == 'ActionBoost':
                cur.execute("INSERT INTO EquipActionBoostTraits ("
                            "Equip, ActionDesc)"
                            "VALUES (\"{}\", \"{}\")".format(
                                foreign_keys[csv_row.get('EquipName')],
                                csv_row.get('KeyName')))


def build_equip_level_upgrade_requirements():
    # Requires EquipLevels, Materials
    # TODO write comment explaining this
    def get_equip_level_tag(row):
        return row['EquipName'] + str(row['Level'])

    with sqlite3.connect(os.path.join('db', 'nolegsbase.db')) as con:
        con.row_factory = sqlite3.Row
        cur = con.cursor()

        cur.execute("SELECT EquipLevels.Id, EquipName, Level FROM Equips "
                    "JOIN EquipLevels ON EquipLevels.Equip = Equips.Id")
        foreign_keys = {get_equip_level_tag(row): row[0]
                        for row in cur.fetchall()}

        cur.execute("SELECT Id, MaterialName FROM Materials")
        foreign_keys.update({row[1]: row[0] for row in cur.fetchall()})

        cur.execute("PRAGMA foreign_keys = ON")
        cur.execute("DROP TABLE IF EXISTS EquipLevelUpgradeRequirements")
        cur.execute("CREATE TABLE EquipLevelUpgradeRequirements("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "EquipLevel INTEGER, "
                    "Material INTEGER, "
                    "Amount INTEGER, "
                    "FOREIGN KEY(EquipLevel) REFERENCES EquipLevels(Id), "
                    "FOREIGN KEY(Material) REFERENCES Materials(Id))")

        for csv_row in get_from_datamaster('EquipLevelUpgradeRequirements.csv'):
            cur.execute("INSERT INTO EquipLevelUpgradeRequirements ("
                        "EquipLevel, Material, Amount) "
                        "VALUES (\"{}\", \"{}\", \"{}\")".format(
                            foreign_keys[get_equip_level_tag(csv_row)],
                            foreign_keys[csv_row.get('MaterialName')],
                            csv_row.get('Amount')))
