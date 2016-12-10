import os
import sqlite3
from db.tables import \
    get_connection, get_from_datamaster, \
    equips_table, equip_level_stats_table, materials_table

requirements = [
    equips_table,
    equip_level_stats_table,
    materials_table
]


def build():
    # TODO write comment explaining this
    def get_equip_level_tag(row):
        return row['EquipName'] + str(row['Level'])

    with get_connection() as con:
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


def read():

    con = get_connection()
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
