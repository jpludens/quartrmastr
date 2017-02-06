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


def get_connection():
    db_name = 'nolegsbase.db'
    filepath = os.path.join(os.path.dirname(__file__), db_name)
    return sqlite3.connect(filepath)
