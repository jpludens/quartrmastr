import quartrmastr
import json
import unittest


class MaterialsTopographyTests(unittest.TestCase):

    def setUp(self):
        self.data = json.loads(quartrmastr.get_materials())

    def test_get_materials__contains_expected_keys(self):
        actuals = [set(item.keys()) for item in self.data]
        expected = {'id', 'name', 'gold'}
        assert(all(actual == expected for actual in actuals))


class EquipsTopographyTests(unittest.TestCase):

    def setUp(self):
        self.data = json.loads(quartrmastr.get_equips())

    def test_get_equips__equips__contains_expected_keys(self):
        actuals = [set(item.keys()) for item in self.data]
        expected = {'id', 'equipName', 'equipSlot', 'levels'}
        assert(all(actual == expected for actual in actuals))

    # DEBT TODO Split into flair/nonflair versions
    def test_get_equips__levels__contains_five_elements(self):
        level_lengths = [len(e['levels']) for e in self.data]
        assert(all(length == 5 for length in level_lengths))

    def test_get_equips__levels_under_max__elements_contain_expected_keys(self):
        equip_level_sets = [e['levels'] for e in self.data]
        actuals = [level.keys() for level_set in equip_level_sets
                   for level in level_set if level < 5]
        expected = {'level', 'upgradeMaterials', 'stats'}
        assert(all(actual == expected for actual in actuals))

    def test_get_equips__levels_max_elements_contain_expected_keys(self):
        equip_level_sets = [e['levels'] for e in self.data]
        actuals = [level.keys() for level_set in equip_level_sets
                   for level in level_set if level == 5]
        expected = {'level', 'stats'}
        assert(all(actual == expected for actual in actuals))

    # DEBT TODO Split into flair/nonflair versions
    def test_get_equips__levels__elements_sorted_by_level_key(self):
        equip_level_sets = [e['levels'] for e in self.data]
        actuals = [[level['level'] for level in level_set]
                   for level_set in equip_level_sets]
        expected = [1, 2, 3, 4, 5]
        assert(all(actual == expected for actual in actuals))

    def test_get_equips__third_level__levels_materials_contains_expected_keys(self):
        equip_level_sets = [e['levels'] for e in self.data]
        actuals = [level["upgradeMaterials"].keys()
                   for level_set in equip_level_sets
                   for level in level_set if level < 5]
        expected = {'materialAmount', 'materialName'}
        assert(all(actual == expected for actual in actuals))


if __name__ == "__main__":
    unittest.main()
