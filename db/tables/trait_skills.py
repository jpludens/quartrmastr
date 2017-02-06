from db import get_connection, get_from_datamaster
from db.tables import traits

requirements = [traits]


def build():
    datamaster = get_from_datamaster("EquipTraits.csv")
    trait_rows_with_skills_by_text = {
        row["Text"]: row
        for row in datamaster
        if row["TraitPropertyName"] == "Skill"}

    with get_connection() as con:
        cur = con.cursor()

        cur.execute("DROP TABLE IF EXISTS TraitSkills")
        cur.execute("CREATE TABLE TraitSkills("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "Trait INTEGER, "
                    "SkillName TEXT, "
                    "FOREIGN KEY(Trait) REFERENCES Traits(Id))")

        for trait in traits.read():
            text = trait["text"]
            trait_row_from_datamaster = trait_rows_with_skills_by_text.get(text)
            if trait_row_from_datamaster:
                trait_id = trait["id"]
                skill_name = trait_row_from_datamaster["TraitPropertyValue"]
                cur.execute("INSERT INTO TraitSkills ("
                            "Trait, SkillName) "
                            "VALUES (\"{}\", \"{}\")".format(
                                trait_id, skill_name))
