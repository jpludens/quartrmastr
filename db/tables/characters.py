import sqlite3
from db import get_connection, get_from_datamaster

requirements = []


def build():
    with get_connection() as con:
        cur = con.cursor()
        cur.execute("DROP TABLE IF EXISTS Characters")
        cur.execute("CREATE TABLE Characters("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "CharacterName TEXT)")

        for csv_row in get_from_datamaster('Characters.csv'):
            cur.execute("INSERT INTO Characters ("
                        "CharacterName) "
                        "VALUES (\"{}\")".format(
                            csv_row.get('CharacterName')))


def read():
    con = get_connection()
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        cur.execute("SELECT "
                    "Id AS id, "
                    "CharacterName AS name "
                    "FROM Characters")
        return [dict(row) for row in cur.fetchall()]
