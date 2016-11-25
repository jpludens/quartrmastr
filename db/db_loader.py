import db_reader as readers


def load_materials():
    return readers.read_materials()


def load_equips():
    def load_stats_into(equips_data):
        stat_keys = [
            "healthPoints",
            "magicPoints",
            "physicalAttack",
            "magicAttack",
            "physicalDefence",
            "magicDefence",
            "accuracy",
            "evade"]
        for stat_entry in readers.read_equip_stats():
            level_data = {
                "level": stat_entry["level"],
                "stats": {k: stat_entry[k] for k in stat_keys}}
            # Data is presorted, but add sorting if that regression test fails.
            equips_data[stat_entry["id"]]["levels"].append(level_data)
        return equips_data

    def load_upgrade_materials_into(data):
        upgrade_keys = [
            "materialName",
            "materialAmount"]
        encountered_equip_levels = set()
        for upgrade_entry in readers.read_equip_upgrades():
            e_id, equip_level = upgrade_entry["id"], upgrade_entry["level"]
            id_level_pair = e_id, equip_level
            level_object = data[e_id]["levels"][equip_level - 1]

            if id_level_pair not in encountered_equip_levels:
                level_object["upgradeMaterials"] = []
                encountered_equip_levels.add(id_level_pair)

            level_object["upgradeMaterials"].append(
                {k: upgrade_entry[k] for k in upgrade_keys})
        return data

    def load_elemental_resistances_into(data):
        encountered_ids = set()
        for resistance_entry in readers.read_equip_elemental_resistances():
            e_id = resistance_entry["id"]
            if e_id not in encountered_ids:
                data[e_id]["elementalResistances"] = []
                encountered_ids.add(e_id)
            data[e_id]["elementalResistances"].append({
                "elementName": resistance_entry["modifierName"],
                "scheme": resistance_entry["scheme"]})

    def load_ailment_resistances_into(data):
        encountered_ids = set()
        for resistance_entry in readers.read_equip_ailment_resistances():
            e_id = resistance_entry["id"]
            if e_id not in encountered_ids:
                data[e_id]["ailmentResistances"] = []
                encountered_ids.add(e_id)
            data[e_id]["ailmentResistances"].append({
                "ailmentName": resistance_entry["modifierName"],
                "scheme": resistance_entry["scheme"]})

    equips_data = {}
    equip_keys = [
        "id",
        "equipName",
        "equipSlot"]
    for equip_entry in readers.read_equips():
        equip_id = equip_entry["id"]
        equips_data[equip_id] = {k: equip_entry[k] for k in equip_keys}
        equips_data[equip_id]["levels"] = []

    load_stats_into(equips_data)
    load_upgrade_materials_into(equips_data)
    load_elemental_resistances_into(equips_data)
    load_ailment_resistances_into(equips_data)

    return equips_data.values()
