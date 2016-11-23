"""QuartrMastr - The Finest Epic Battle Fantasy 4 Equipment Analyzer"""

import flask
import json
import sqlite3
import os


app = flask.Flask(__name__)
db_location = os.path.join('db', 'nolegsbase.db')
api_root = "localhost:5000/api/v1/"


def read_materials():
    con = sqlite3.connect(db_location)
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "Id AS id, "
                    "MaterialName AS name, "
                    "MaterialPrice AS gold "
                    "FROM Materials")
        return [dict(row) for row in cur.fetchall()]


def read_equip_stats():
    con = sqlite3.connect(db_location)
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "Equips.Id AS id, "
                    "EquipName AS equipName, "
                    "EquipSlot AS equipSlot, "
                    "Level AS level, "
                    "PAttack AS physicalAttack, "
                    "MAttack AS magicAttack, "
                    "PDefense AS physicalDefense, "
                    "MDefense AS magicDefense "
                    "FROM Equips "
                    "JOIN EquipLevels "
                    "ON EquipLevels.Equip = Equips.Id ")
        return [dict(row) for row in cur.fetchall()]


def read_equip_upgrades():
    # This is read separately from stats data because max level equips have no
    # upgrades, so are excluded from inner joins.
    # This avoids an ugly outer join union and simplifies conversion logic.
    con = sqlite3.connect(db_location)
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "Equips.Id AS id, "
                    "Level AS level, "
                    "MaterialName AS materialName, "
                    "Amount AS materialAmount "
                    "FROM Equips "
                    "JOIN EquipLevels "
                    "ON EquipLevels.Equip = Equips.Id "
                    "JOIN EquipUpgradeMaterials "
                    "ON EquipUpgradeMaterials.EquipLevel = EquipLevels.Id "
                    "JOIN Materials "
                    "ON EquipUpgradeMaterials.Material = Materials.Id")
        return [dict(row) for row in cur.fetchall()]


@app.route('/api/v1/materials/', methods=['GET'])
def get_materials():
    return json.dumps(read_materials())


@app.route('/api/v1/equips/', methods=['GET'])
def get_equips():
    # TODO level as equipLevel, name as equipName, slot as equipSlot
    # Keys at various hierarchy levels
    equip_keys = ["id", "equipName", "equipSlot"]
    stat_keys = [
        "physicalAttack",
        "magicAttack",
        "physicalDefense",
        "magicDefense"]
    upgrade_keys = ["materialName", "materialAmount"]

    # Initializing result
    equips_by_id = {}

    # Process stat entries into a list of equipments
    stat_entries = read_equip_stats()
    encountered_equips = set()
    for entry in stat_entries:
        equip_id = entry["id"]
        if equip_id not in encountered_equips:
            # Add this equip to the list if it's new
            equips_by_id[equip_id] = {k: entry[k] for k in equip_keys}
            equips_by_id[equip_id]["levels"] = []
            encountered_equips.add(equip_id)

        level_data = {
            "level": entry["level"],
            "stats": {k: entry[k] for k in stat_keys}}
        # Data is presorted, but add sorting if that regression test fails.
        equips_by_id[equip_id]["levels"].append(level_data)

    # Read upgrade material and add to the object
    upgrade_entries = read_equip_upgrades()
    encountered_equip_levels = set()
    for entry in upgrade_entries:
        equip_id, equip_level = entry["id"], entry["level"]
        id_level_pair = equip_id, equip_level
        level_object = equips_by_id[equip_id]["levels"][equip_level - 1]
        if id_level_pair not in encountered_equip_levels:
            # Create an upgrades object if this equip level is new
            level_object["upgradeMaterials"] = []
            encountered_equip_levels.add(id_level_pair)

        level_object["upgradeMaterials"].append(
            {k: entry[k] for k in upgrade_keys})

    return json.dumps(equips_by_id.values())


@app.route('/', methods=['GET'])
def index():
    return flask.render_template('index.html')


@app.route('/materials/', methods=['GET'])
def materials_view():
    return flask.render_template('materials.html')


@app.route('/equips/', methods=['GET'])
def equips_view():
    return flask.render_template('equips.html')


if __name__ == '__main__':
    app.run(debug=True)
