from db.tables import \
    equips,\
    equip_traits,\
    equip_elemental_resistances,\
    equip_status_resistances,\
    equip_level_stats,\
    equip_level_upgrade_requirements


def load():
    equips_data = {}
    equip_keys = [
        "id",
        "name",
        "slot",
        "type"]

    for equip_entry in equips.read():
        equip_id = equip_entry["id"]
        equips_data[equip_id] = {k: equip_entry[k] for k in equip_keys}
        equips_data[equip_id]["levels"] = {}
        equips_data[equip_id]["traits"] = []

    for equip_id, level_stats in equip_level_stats.load().items():
        for level, stats in level_stats.items():
            equips_data[equip_id]["levels"][level] = {
                "level": level,
                "stats": stats}

    for equip_id, level_reqs in equip_level_upgrade_requirements.load().items():
        for level, reqs in level_reqs.items():
            equips_data[equip_id]["levels"][level]["upgradeMaterialRequirements"] = reqs

    for equip_id, status_res in equip_status_resistances.load().items():
        for level, res in status_res.items():
            equips_data[equip_id]["levels"][level]["statusResistances"] = res

    for equip_id, element_res in equip_elemental_resistances.load().items():
        for level, res in element_res.items():
            equips_data[equip_id]["levels"][level]["elementalResistances"] = res

    for equip_trait in equip_traits.read():
        equips_data[equip_trait["equip"]]["traits"].append(equip_trait)

    # Dict keyed by level value was useful for munging data,
    # but needs to be received as a JSON array.
    for equip in equips_data.values():
        equip["levels"] = equip["levels"].values()

    return equips_data.values()
