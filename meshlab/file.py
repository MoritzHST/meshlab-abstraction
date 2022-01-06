class File:
    def __init__(self, name, date):
        self.name = name
        self.date = date

    def serialize(self):
        return {"name": self.name,
                "date": self.date}