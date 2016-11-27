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

    def load_upgrade_requirements_into(data):
        upgrade_keys = [
            "materialName",
            "materialAmount"]
        encountered_equip_levels = set()
        for upgrade_entry in readers.read_equip_upgrade_requirements():
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
                "elementName": resistance_entry["elementName"],
                "scheme": resistance_entry["scheme"]})

    def load_status_resistances_into(data):
        encountered_ids = set()
        for resistance_entry in readers.read_equip_status_resistances():
            e_id = resistance_entry["id"]
            if e_id not in encountered_ids:
                data[e_id]["statusResistances"] = []
                encountered_ids.add(e_id)
            data[e_id]["statusResistances"].append({
                "statusName": resistance_entry["statusName"],
                "scheme": resistance_entry["scheme"]})

    def load_traits_into(data):
        for equip in data.values():
            equip["traits"] = []
            
        for imbue in readers.read_equip_element_imbue_traits():
            data[imbue['id']]['traits'].append({
                'traitType': 'imbueElement',
                'elementName': imbue['elementName']})
            
        for boost in readers.read_equip_element_boost_traits():
            data[boost['id']]['traits'].append({
                'traitType': 'boostElement',
                'elementName': boost['elementName']})
            
        for beat in readers.read_equip_skill_beat_traits():
            data[beat['id']]['traits'].append({
                'traitType': 'beatSkill',
                'skillName': beat['skillName']})
            
        for stack in readers.read_equip_skill_stack_traits():
            data[stack['id']]['traits'].append({
                'traitType': 'stackSkill',
                'skillName': stack['skillName']})
            
        for counter in readers.read_equip_skill_counter_traits():
            data[counter['id']]['traits'].append({
                'traitType': 'counterSkill',
                'skillName': counter['skillName']})
            
        for onTarget in readers.read_equip_status_on_target_traits():
            data[onTarget['id']]['traits'].append({
                'traitType': 'statusOnTarget',
                'statusName': onTarget['statusName']})
            
        for onPlayer in readers.read_equip_status_on_player_traits():
            data[onPlayer['id']]['traits'].append({
                'traitType': 'statusOnPlayer',
                'statusName': onPlayer['statusName']})

        for drain in readers.read_equip_drain_traits():
            data[drain['id']]['traits'].append({
                'traitType': 'drain',
                'statName': drain['statName']})

        for debuff in readers.read_equip_stat_debuff_traits():
            data[debuff['id']]['traits'].append({
                'traitType': 'statDebuff',
                'statModifierName': debuff['statModifierName']})

    # End helper functions, start load_equips
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
    load_upgrade_requirements_into(equips_data)
    load_elemental_resistances_into(equips_data)
    load_status_resistances_into(equips_data)
    load_traits_into(equips_data)

    return equips_data.values()
