import os
import sqlite3
from db.tables import get_connection, get_from_datamaster

requirements = []


def build():
    # TODO Link to Stats
    with get_connection() as con:
        cur = con.cursor()
        cur.execute("DROP TABLE IF EXISTS StatModifiers")
        cur.execute("CREATE TABLE StatModifiers("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "StatModifierName TEXT, "
                    "StatModifierType TEXT)")

        for csv_row in get_from_datamaster('StatModifiers.csv'):
            cur.execute("INSERT INTO StatModifiers ("
                        "StatModifierName, StatModifierType) "
                        "VALUES (\"{}\", \"{}\")".format(
                            csv_row.get('StatModifierName'),
                            csv_row.get('StatModifierType')))


def read():

    con = get_connection()
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "Id AS id, "
                    "MaterialName AS name, "
                    "MaterialPrice AS gold "
                    "FROM Materials")
        return [dict(row) for row in cur.fetchall()]
