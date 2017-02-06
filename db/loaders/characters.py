from db.tables import character_equip_slots, default_equips, equip_slots


def load():
    slot_type_data = equip_slots.read()
    slot_types = {std["slotName"]: std["slotType"]
                  for std in slot_type_data}

    character_slot_data = character_equip_slots.read()
    character_data = {}
    for entry in character_slot_data:
        character_name = entry["characterName"]
        if character_name not in character_data:
            character_data[character_name] = {
                "equipSlots": [],
                "defaultEquips": []}
        character_data[character_name]["equipSlots"].append({
            "slotName": entry["slotName"],
            "slotType": slot_types[entry["slotName"]]})

    default_data = default_equips.read()
    for entry in default_data:
        character_name = entry["characterName"]
        slot = entry["slotName"]
        equip = entry["equipName"]
        character_data[character_name]["defaultEquips"].append(
            {
                "slotName": slot,
                "equipName": equip})

    return_data = [
        {
            'name': key,
            'equipSlots': value["equipSlots"],
            'defaultEquips': value["defaultEquips"]}
        for key, value in character_data.items()]
    return return_data
