import sqlite3
from db.tables import get_connection, get_from_datamaster

requirements = []


def build():
    with get_connection() as con:
        cur = con.cursor()
        cur.execute("DROP TABLE IF EXISTS Statuses")
        cur.execute("CREATE TABLE Statuses("
                    "Id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    "StatusName TEXT, "
                    "StatusType TEXT)")

        for csv_row in get_from_datamaster('Statuses.csv'):
            cur.execute("INSERT INTO Statuses ("
                        "StatusName, StatusType) "
                        "VALUES (\"{}\", \"{}\")".format(
                            csv_row.get('StatusName'),
                            csv_row.get('StatusType')))


def read():
    pass
