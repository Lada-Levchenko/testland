from abc import abstractmethod

class Figure(object):
    def __init__(self, **kwargs):
        super(Figure, self).__init__()
        self.x = kwargs["x"]
        self.y = kwargs["y"]

    @abstractmethod
    def draw(self):
        """Draw some figure"""

class Rectangle(Figure):
    def __init__(self, **kwargs):
        super(Rectangle, self).__init__(**kwargs)
        self.width = kwargs["width"]
        self.height = kwargs["height"]
        if "color" in kwargs:
            self.color = kwargs["color"]
        else:
            self.color = "black"

    def draw(self):
        turtle.setpos(self.x, self.y)
        turtle.begin_fill()
        turtle.color(self.color)
        turtle.down()
        for i in range(2):
            turtle.forward(self.width)
            turtle.right(90)
            turtle.forward(self.height)
            turtle.right(90)
        turtle.up()
        turtle.end_fill()