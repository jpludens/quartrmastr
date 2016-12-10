import sqlite3
from db.tables import get_connection, get_from_datamaster

requirements = []


def build():
    with get_connection() as con:
        cur = con.cursor()
        cur.execute("DROP TABLE IF EXISTS Elements")
        cur.execute("CREATE TABLE Elements("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "ElementName TEXT)")

        for csv_row in get_from_datamaster('Elements.csv'):
            cur.execute("INSERT INTO Elements ("
                        "ElementName) "
                        "VALUES (\"{}\")".format(
                            csv_row.get('ElementName')))


def read():
    pass
