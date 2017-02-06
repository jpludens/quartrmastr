import sqlite3
from db import get_connection, get_from_datamaster
from db.tables import trait_types

requirements = [trait_types]


def build():
    encountered_texts = set()
    trait_rows = []
    for row in get_from_datamaster('EquipTraits.csv'):
        text = row["Text"]
        if text not in encountered_texts:
            encountered_texts.add(text)
            trait_rows.append(row)

    with get_connection() as con:
        cur = con.cursor()
        cur.execute("DROP TABLE IF EXISTS Traits")
        cur.execute("CREATE TABLE Traits("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "TraitType INTEGER, "
                    "Text TEXT, "
                    "FOREIGN KEY(TraitType) REFERENCES TraitTypes(Id))")

        cur.execute("SELECT TraitTypeName, Id FROM TraitTypes")
        foreign_keys = {cur_row[0]: cur_row[1]
                        for cur_row in cur.fetchall()}

        for trait_row in trait_rows:
            cur.execute("INSERT INTO Traits ("
                        "TraitType, Text) "
                        "VALUES (\"{}\", \"{}\")".format(
                            foreign_keys[trait_row["TraitTypeName"]],
                            trait_row["Text"]))


def read():
    con = get_connection()
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "Traits.Id AS id, "
                    "TraitTypeName AS traitType, "
                    "Text AS text "
                    "FROM Traits "
                    "JOIN TraitTypes "
                    "WHERE Traits.TraitType = TraitTypes.Id")
        return [dict(row) for row in cur.fetchall()]
