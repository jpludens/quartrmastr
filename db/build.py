import db_builder as builders


def build():
    # Build tables with no requirements
    builders.build_stats()
    builders.build_elements()
    builders.build_statuses()
    builders.build_equips()
    builders.build_materials()

    # Build dependent tables
    builders.build_stat_modifiers()
    builders.build_equip_level_stats()
    builders.build_equip_elemental_resistances()
    builders.build_equip_status_resistances()
    builders.build_equip_element_imbue_traits()
    builders.build_equip_element_boost_traits()
    builders.build_equip_skill_beat_traits()
    builders.build_equip_skill_stack_traits()
    builders.build_equip_skill_counter_traits()
    builders.build_equip_status_on_target_traits()
    builders.build_equip_status_on_player_traits()
    builders.build_equip_drain_traits()
    # builders.build_equip_action_traits()
    builders.build_equip_level_upgrade_requirements()

    # Build further dependent tables
    builders.build_equip_stat_debuff_traits()
    # builders.build_equip_stat_buff_traits()

if __name__ == "__main__":
    build()
