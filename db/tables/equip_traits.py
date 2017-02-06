import sqlite3
from db import get_connection, get_from_datamaster, get_equip_keys
from db.tables import equips, traits

requirements = [equips, traits]


def build():
    with get_connection() as con:
        con.row_factory = sqlite3.Row
        cur = con.cursor()

        equip_ids_by_name = get_equip_keys(cur)

        cur.execute("SELECT Text, Id FROM Traits")
        trait_ids_by_text = {cur_row[0]: cur_row[1]
                             for cur_row in cur.fetchall()}

        cur.execute("PRAGMA foreign_keys = ON")
        cur.execute("DROP TABLE IF EXISTS EquipTraits")
        cur.execute("CREATE TABLE EquipTraits("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "Equip INTEGER, "
                    "Trait INTEGER, "
                    "FOREIGN KEY(Equip) REFERENCES Equips(Id), "
                    "FOREIGN KEY(Trait) REFERENCES Traits(Id))")

        for csv_row in get_from_datamaster('EquipTraits.csv'):
            cur.execute("INSERT INTO EquipTraits ("
                        "Equip, Trait)"
                        "VALUES (\"{}\", \"{}\")".format(
                            equip_ids_by_name[csv_row.get('EquipName')],
                            trait_ids_by_text[csv_row.get('Text')]))


def read():
    con = get_connection()
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "EquipTraits.Id AS Id, "
                    "Traits.Id AS trait, "
                    "TraitTypes.TraitTypeName AS traitType, "
                    "Traits.Text AS text, "
                    "Equip AS equip, "
                    "ElementName AS element "
                    "FROM EquipTraits "
                    "JOIN Traits "
                    "ON EquipTraits.Trait = Traits.Id "
                    "JOIN Elements "
                    "ON TraitElements.Element = Elements.Id "
                    "JOIN TraitTypes "
                    "ON Traits.TraitType = TraitTypes.Id "
                    "JOIN TraitElements "
                    "WHERE TraitElements.Trait = Traits.Id ")
        element_traits = [dict(row) for row in cur.fetchall()]

        cur.execute("SELECT "
                    "EquipTraits.Id AS id, "
                    "Traits.Id AS trait, "
                    "TraitTypes.TraitTypeName AS traitType, "
                    "Traits.Text AS text, "
                    "Equip AS equip, "
                    "StatusName AS status "
                    "FROM EquipTraits "
                    "JOIN Traits "
                    "ON EquipTraits.Trait = Traits.Id "
                    "JOIN Statuses "
                    "ON TraitStatuses.Status = Statuses.Id "
                    "JOIN TraitTypes "
                    "ON Traits.TraitType = TraitTypes.Id "
                    "JOIN TraitStatuses "
                    "WHERE TraitStatuses.Trait = Traits.Id ")
        stat_traits = [dict(row) for row in cur.fetchall()]

        cur.execute("SELECT "
                    "EquipTraits.Id AS id, "
                    "Traits.Id AS trait, "
                    "TraitTypes.TraitTypeName AS traitType, "
                    "Traits.Text AS text, "
                    "Equip AS equip, "
                    "StatName AS stat "
                    "FROM EquipTraits "
                    "JOIN Traits "
                    "ON EquipTraits.Trait = Traits.Id "
                    "JOIN Stats "
                    "ON TraitStats.Stat = Stats.Id "
                    "JOIN TraitTypes "
                    "ON Traits.TraitType = TraitTypes.Id "
                    "JOIN TraitStats "
                    "WHERE TraitStats.Trait = Traits.Id")
        status_traits = [dict(row) for row in cur.fetchall()]

        cur.execute("SELECT "
                    "EquipTraits.Id AS id, "
                    "Traits.Id AS trait, "
                    "TraitTypes.TraitTypeName AS traitType, "
                    "Traits.Text AS text, "
                    "Equip AS equip, "
                    "SkillName AS skillName "
                    "FROM EquipTraits "
                    "JOIN Traits "
                    "ON EquipTraits.Trait = Traits.Id "
                    "JOIN TraitTypes "
                    "ON Traits.TraitType = TraitTypes.Id "
                    "JOIN TraitSkills "
                    "WHERE TraitSkills.Trait = Traits.Id")
        skill_traits = [dict(row) for row in cur.fetchall()]

        cur.execute("SELECT "
                    "EquipTraits.Id AS id, "
                    "Traits.Id AS trait, "
                    "TraitTypes.TraitTypeName AS traitType, "
                    "Traits.Text AS text, "
                    "Equip AS equip, "
                    "Miscprop AS property "
                    "FROM EquipTraits "
                    "JOIN Traits "
                    "ON EquipTraits.Trait = Traits.Id "
                    "JOIN TraitTypes "
                    "ON Traits.TraitType = TraitTypes.Id "
                    "JOIN TraitMiscprops "
                    "WHERE TraitMiscprops.Trait = Traits.Id")
        misc_traits = [dict(row) for row in cur.fetchall()]

        return element_traits + stat_traits + status_traits + skill_traits + misc_traits
