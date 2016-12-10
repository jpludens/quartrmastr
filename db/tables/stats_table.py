import sqlite3
from db.tables import get_connection, get_from_datamaster

requirements = []


def build():
    with get_connection() as con:
        cur = con.cursor()
        cur.execute("DROP TABLE IF EXISTS Stats")
        cur.execute("CREATE TABLE Stats("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "StatName TEXT)")

        for csv_row in get_from_datamaster('Stats.csv'):
            cur.execute("INSERT INTO Stats ("
                        "StatName) "
                        "VALUES (\"{}\")".format(
                            csv_row.get('StatName')))


def read():
    pass
