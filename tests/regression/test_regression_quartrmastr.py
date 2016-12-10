import quartrmastr
import json
import unittest


class CharactersTopographyTests(unittest.TestCase):

    def setUp(self):
        self.data = json.loads(quartrmastr.get_characters())

    # TODO


class EquipsTopographyTests(unittest.TestCase):

    def setUp(self):
        self.data = json.loads(quartrmastr.get_equips())

    def test_get_equips__equips__contains_expected_keys(self):
        key_sets = [set(item.keys()) for item in self.data]
        # Make sure we get something
        self.assertTrue(key_sets != [])
        expected_keys = {
            'id',
            'equipName',
            'equipSlot',
            'levels',
            'traits',
            'elementalResistances',
            'statusResistances'}
        expected_diffs = [
            set(),
            {'elementalResistances'},
            {'statusResistances'},
            {'elementalResistances',
             'statusResistances'}]
        # None of the items have keys we are not expecting
        self.assertTrue(all(key_set.difference(expected_keys) == set() for key_set in key_sets))
        self.assertTrue(all(expected_keys.difference(key_set) in expected_diffs for key_set in key_sets))

    def test_get_equips__elemental_resistances__contains_expected_keys(self):
        resistance_sets = [e['elementalResistances'] for e in self.data
                           if 'elementalResistances' in e]
        actuals = [set(resistance.keys())
                   for resistance_set in resistance_sets
                   for resistance in resistance_set]
        self.assertTrue(actuals != [])
        expected = {
            "elementName",
            "scheme"}
        self.assertTrue(all(actual == expected for actual in actuals))

    def test_get_equips__ailment_resistances__contains_expected_keys(self):
        resistance_sets = [e['statusResistances'] for e in self.data
                           if 'statusResistances' in e]
        actuals = [set(resistance.keys())
                   for resistance_set in resistance_sets
                   for resistance in resistance_set]
        expected = {
            "statusName",
            "scheme"}
        self.assertTrue(all(actual == expected for actual in actuals))

    def test_get_equips__levels__contains_five_elements(self):
        level_lengths = [len(e['levels']) for e in self.data
                         if e['equipSlot'] != 'Flair']
        assert level_lengths != []
        self.assertTrue(all(length == 5 for length in level_lengths))

    def test_get_equips__flair_levels__contains_five_elements(self):
        level_lengths = [len(e['levels']) for e in self.data
                         if e['equipSlot'] == 'Flair']
        assert level_lengths != []
        self.assertTrue(all(length == 3 for length in level_lengths))

    def test_get_equips__levels_under_max__elements_contain_expected_keys(self):
        equip_level_sets = [e['levels'] for e in self.data
                            if e['equipSlot'] != 'Flair']
        actuals = [set(level.keys()) for level_set in equip_level_sets
                   for level in level_set if level.get('level') < 5]
        self.assertTrue(actuals != [])
        expected = {
            'level',
            'upgradeMaterials',
            'stats'}
        self.assertTrue(all(actual == expected for actual in actuals))

    def test_get_equips__flair_levels_under_max__elements_contain_expected_keys(self):
        equip_level_sets = [e['levels'] for e in self.data
                            if e['equipSlot'] == 'Flair']
        actuals = [set(level.keys()) for level_set in equip_level_sets
                   for level in level_set if level.get('level') < 3]
        self.assertTrue(actuals != [])
        expected = {
            'level',
            'upgradeMaterials',
            'stats'}
        self.assertTrue(all(actual == expected for actual in actuals))

    def test_get_equips__levels_max__elements_contain_expected_keys(self):
        equip_level_sets = [e['levels'] for e in self.data
                            if e['equipSlot'] != 'Flair']
        actuals = [set(level.keys()) for level_set in equip_level_sets
                   for level in level_set if level.get('level') == 5]
        self.assertTrue(actuals != [])
        expected = {
            'level',
            'stats'}
        self.assertTrue(all(actual == expected for actual in actuals))

    def test_get_equips__flair_levels_max__elements_contain_expected_keys(self):
        equip_level_sets = [e['levels'] for e in self.data
                            if e['equipSlot'] == 'Flair']
        actuals = [set(level.keys()) for level_set in equip_level_sets
                   for level in level_set if level.get('level') == 3]
        self.assertTrue(actuals != [])
        expected = {
            'level',
            'stats'}
        self.assertTrue(all(actual == expected for actual in actuals))

    def test_get_equips__levels__elements_sorted_by_level_key(self):
        equip_level_sets = [e['levels'] for e in self.data
                            if e['equipSlot'] != 'Flair']
        actuals = [[level.get('level') for level in level_set]
                   for level_set in equip_level_sets]
        self.assertTrue(actuals != [])
        expected = [1, 2, 3, 4, 5]
        self.assertTrue(all(actual == expected for actual in actuals))

    def test_get_equips__flair_levels__elements_sorted_by_level_key(self):
        equip_level_sets = [e['levels'] for e in self.data
                            if e['equipSlot'] == 'Flair']
        actuals = [[level.get('level') for level in level_set]
                   for level_set in equip_level_sets]
        self.assertTrue(actuals != [])
        expected = [1, 2, 3]
        self.assertTrue(all(actual == expected for actual in actuals))

    def test_get_equips__third_level__levels_materials_contains_expected_keys(self):
        equip_level_sets = [e['levels'] for e in self.data
                            if e['equipSlot'] != 'Flair']
        actuals = [set(upgradeMaterial.keys())
                   for level_set in equip_level_sets
                   for level in level_set if level.get('level') < 5
                   for upgradeMaterial in level.get('upgradeMaterials')]
        self.assertTrue(actuals != [])
        expected = {'materialAmount', 'materialName'}
        self.assertTrue(all(actual == expected for actual in actuals))

    def test_get_equips__third_level__flair_levels_materials_contains_expected_keys(self):
        equip_level_sets = [e['levels'] for e in self.data
                            if e['equipSlot'] == 'Flair']
        actuals = [set(upgradeMaterial.keys())
                   for level_set in equip_level_sets
                   for level in level_set if level.get('level') < 3
                   for upgradeMaterial in level.get('upgradeMaterials')]
        self.assertTrue(actuals != [])
        expected = {'materialAmount', 'materialName'}
        self.assertTrue(all(actual == expected for actual in actuals))

    def test_get_equips__third_level__levels_stats_contains_expected_keys(self):
        equip_level_sets = [e['levels'] for e in self.data]
        actuals = [set(level.get('stats').keys())
                   for level_set in equip_level_sets
                   for level in level_set]
        self.assertTrue(actuals != [])
        expected = {
            'healthPoints',
            'magicPoints',
            'physicalAttack',
            'magicAttack',
            'physicalDefence',
            'magicDefence',
            'accuracy',
            'evade'}
        self.assertTrue(all(actual == expected for actual in actuals))


class MaterialsTopographyTests(unittest.TestCase):

    def setUp(self):
        self.data = json.loads(quartrmastr.get_materials())

    def test_get_materials__contains_expected_keys(self):
        actuals = [set(item.keys()) for item in self.data]
        expected = {'id', 'name', 'gold'}
        self.assertTrue(all(actual == expected for actual in actuals))


if __name__ == "__main__":
    unittest.main()
