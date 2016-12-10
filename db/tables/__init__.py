import os
import csv
import sqlite3


def get_from_datamaster(filename):
    filepath = os.path.join(os.getcwd(), 'datamasters', filename)
    with open(filepath, 'r') as f:
        return [r for r in csv.DictReader(f)]


def get_equip_keys(cursor):
    cursor.execute("SELECT EquipName, Id FROM Equips")
    return {equip_row[0]: equip_row[1]
            for equip_row in cursor.fetchall()}

# TODO move this up a level to the db package
def get_connection():
    db_name = 'nolegsbase.db'
    filepath = os.path.join(os.path.dirname(__file__), '../', db_name)
    return sqlite3.connect(filepath)


import character_equip_slots_table
import characters_table
import elements_table
import equip_action_boost_traits_table
import equip_buff_reflex_traits_table
import equip_drain_traits_table
import equip_element_boost_traits_table
import equip_element_imbue_traits_table
import equip_elemental_resistances_table
import equip_level_stats_table
import equip_level_upgrade_requirements_table
import equip_skill_beat_traits_table
import equip_skill_counter_traits_table
import equip_skill_stack_traits_table
import equip_slot_types_table
import equip_slots_table
import equip_stat_debuff_traits_table
import equip_status_on_player_traits_table
import equip_status_on_target_traits_table
import equip_status_replace_traits_table
import equip_status_resistances_table
import equips_table
import materials_table
import stat_modifiers_table
import stats_table
import statuses_table

__all__ = [    
    character_equip_slots_table,
    characters_table,
    elements_table,
    equip_action_boost_traits_table,
    equip_buff_reflex_traits_table,
    equip_drain_traits_table,
    equip_element_boost_traits_table,
    equip_element_imbue_traits_table,
    equip_elemental_resistances_table,
    equip_level_stats_table,
    equip_level_upgrade_requirements_table,
    equip_skill_beat_traits_table,
    equip_skill_counter_traits_table,
    equip_skill_stack_traits_table,
    equip_slot_types_table,
    equip_slots_table,
    equip_stat_debuff_traits_table,
    equip_status_on_player_traits_table,
    equip_status_on_target_traits_table,
    equip_status_replace_traits_table,
    equip_status_resistances_table,
    equips_table,
    materials_table,
    stat_modifiers_table,
    stats_table,
    statuses_table
]
