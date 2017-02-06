import sqlite3
from db import get_connection, get_from_datamaster, get_equip_keys
from db.tables import equips

requirements = [
    equips
]


def build():
    # Requires Equips
    # TODO Link to stats (??? wait, but how?)
    with get_connection() as con:
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


def read():
    con = get_connection()
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "Equips.Id AS equip, "
                    "Level AS level, "
                    "HP AS HEALTH_POINTS, "
                    "MP AS MAGIC_POINTS, "
                    "PAttack AS ATTACK, "
                    "MAttack AS MAGIC_ATTACK, "
                    "PDefence AS DEFENCE, "
                    "MDefence AS MAGIC_DEFENCE, "
                    "Accuracy AS ACCURACY, "
                    "Evade AS EVADE "
                    "FROM Equips "
                    "JOIN EquipLevels "
                    "ON EquipLevels.Equip = Equips.Id ")
        return [dict(row) for row in cur.fetchall()]


def load():
    raw_data = read()
    result = {}
    for row in raw_data:
        equip = row["equip"]
        level = row["level"]
        stats = {k: v for k, v in row.items() if k not in ["equip", "level"]}

        try:
            result[equip][level] = stats
        except KeyError:
            result[equip] = {level: stats}
    return result
