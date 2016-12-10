import tables


def load_characters():
    raw_data = tables.character_equip_slots_table.read()
    character_data = {}
    for entry in raw_data:
        character = entry["character"]
        if character not in character_data:
            character_data[character] = []
        character_data[character].append(entry["slot"])
    return_data = [
        {
            'name': key,
            'equipSlots': value}
        for key, value in character_data.items()]
    return return_data


def load_equips():
    def load_stats_into(data):
        stat_keys = [
            "healthPoints",
            "magicPoints",
            "physicalAttack",
            "magicAttack",
            "physicalDefence",
            "magicDefence",
            "accuracy",
            "evade"]
        for stat_entry in tables.equip_level_stats_table.read():
            level_data = {
                "level": stat_entry["level"],
                "stats": {k: stat_entry[k] for k in stat_keys}}
            # Data is presorted, but add sorting if that regression test fails.
            data[stat_entry["id"]]["levels"].append(level_data)
        return data

    def load_upgrade_requirements_into(data):
        upgrade_keys = [
            "materialName",
            "materialAmount"]
        encountered_equip_levels = set()
        for upgrade_entry in tables.equip_level_upgrade_requirements_table.read():
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
        for resistance_entry in tables.equip_elemental_resistances_table.read():
            e_id = resistance_entry["id"]
            if e_id not in encountered_ids:
                data[e_id]["elementalResistances"] = []
                encountered_ids.add(e_id)
            data[e_id]["elementalResistances"].append({
                "elementName": resistance_entry["elementName"],
                "scheme": resistance_entry["scheme"]})

    def load_status_resistances_into(data):
        encountered_ids = set()
        for resistance_entry in tables.equip_status_resistances_table.read():
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
            
        for imbue in tables.equip_element_imbue_traits_table.read():
            data[imbue['id']]['traits'].append({
                'traitType': 'imbueElement',
                'elementName': imbue['elementName']})
            
        for boost in tables.equip_element_boost_traits_table.read():
            data[boost['id']]['traits'].append({
                'traitType': 'boostElement',
                'elementName': boost['elementName']})

        for boost in tables.equip_action_boost_traits_table.read():
            data[boost['id']]['traits'].append({
                'traitType': 'actionBoost',
                'actionDesc': boost['actionDesc']})
            
        for beat in tables.equip_skill_beat_traits_table.read():
            data[beat['id']]['traits'].append({
                'traitType': 'beatSkill',
                'skillName': beat['skillName']})
            
        for stack in tables.equip_skill_stack_traits_table.read():
            data[stack['id']]['traits'].append({
                'traitType': 'stackSkill',
                'skillName': stack['skillName']})
            
        for counter in tables.equip_skill_counter_traits_table.read():
            data[counter['id']]['traits'].append({
                'traitType': 'counterSkill',
                'skillName': counter['skillName']})
            
        for onTarget in tables.equip_status_on_target_traits_table.read():
            data[onTarget['id']]['traits'].append({
                'traitType': 'statusOnTarget',
                'statusName': onTarget['statusName']})
            
        for onPlayer in tables.equip_status_on_player_traits_table.read():
            data[onPlayer['id']]['traits'].append({
                'traitType': 'statusOnPlayer',
                'statusName': onPlayer['statusName']})

        for onTarget in tables.equip_status_replace_traits_table.read():
            data[onTarget['id']]['traits'].append({
                'traitType': 'statusReplace',
                'statusName': onTarget['statusName']})

        for drain in tables.equip_drain_traits_table.read():
            data[drain['id']]['traits'].append({
                'traitType': 'drain',
                'statName': drain['statName']})

        for debuff in tables.equip_stat_debuff_traits_table.read():
            data[debuff['id']]['traits'].append({
                'traitType': 'statDebuff',
                'statModifierName': debuff['statModifierName']})

        for buff in tables.equip_buff_reflex_traits_table.read():
            data[buff['id']]['traits'].append({
                'traitType': 'buffReflex',
                'statModifierName': buff['statModifierName']})

    # End helper functions, start load_equips
    equips_data = {}
    equip_keys = [
        "id",
        "equipName",
        "equipSlot"]
    for equip_entry in tables.equips_table.read():
        equip_id = equip_entry["id"]
        equips_data[equip_id] = {k: equip_entry[k] for k in equip_keys}
        equips_data[equip_id]["levels"] = []

    load_stats_into(equips_data)
    load_upgrade_requirements_into(equips_data)
    load_elemental_resistances_into(equips_data)
    load_status_resistances_into(equips_data)
    load_traits_into(equips_data)

    return equips_data.values()


def load_materials():
    return tables.materials_table.read()
