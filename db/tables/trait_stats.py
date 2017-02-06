from db import get_connection, get_from_datamaster
from db.tables import traits

requirements = [traits]


def build():
    datamaster = get_from_datamaster("EquipTraits.csv")
    trait_rows_with_stats_by_text = {
        row["Text"]: row
        for row in datamaster
        if row["TraitPropertyName"] == "Stat"}

    with get_connection() as con:
        cur = con.cursor()

        cur.execute("SELECT StatName, Id FROM Stats")
        stat_ids_by_name = {cur_row[0]: cur_row[1]
                            for cur_row in cur.fetchall()}

        cur.execute("DROP TABLE IF EXISTS TraitStats")
        cur.execute("CREATE TABLE TraitStats("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "Trait INTEGER, "
                    "Stat INTEGER, "
                    "FOREIGN KEY(Trait) REFERENCES Traits(Id) ,"
                    "FOREIGN KEY(Stat) REFERENCES Stats(Id))")

        for trait in traits.read():
            text = trait["text"]
            trait_row_from_datamaster = trait_rows_with_stats_by_text.get(text)
            if trait_row_from_datamaster:
                trait_id = trait["id"]
                stat_id = stat_ids_by_name[
                    trait_row_from_datamaster[
                        "TraitPropertyValue"]]
                cur.execute("INSERT INTO TraitStats ("
                            "Trait, Stat) "
                            "VALUES (\"{}\", \"{}\")".format(
                                trait_id, stat_id))
