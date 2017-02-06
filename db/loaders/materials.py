from db.tables import materials


def load():
    return materials.read()
