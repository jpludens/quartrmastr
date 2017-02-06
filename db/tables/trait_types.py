from db import get_connection, get_from_datamaster

requirements = []


def build():
    with get_connection() as con:
        cur = con.cursor()
        cur.execute("DROP TABLE IF EXISTS TraitTypes")
        cur.execute("CREATE TABLE TraitTypes("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "TraitTypeName TEXT)")

        trait_types = set([row["TraitTypeName"]
                           for row in get_from_datamaster('EquipTraits.csv')])

        for trait_type in trait_types:
            cur.execute("INSERT INTO TraitTypes ("
                        "TraitTypeName) "
                        "VALUES (\"{}\")".format(trait_type))
