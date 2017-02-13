import cmd
import turtle

class TurtleShell(cmd.Cmd):
    intro = 'Welcome to the turtle shell.   Type help or ? to list commands.\n'
    prompt = '(turtle) '
    file = None

    # ----- figure turtle commands -----
    def do_rect(self, arg):
        'Draw rectangle with given width and height:  RECT 50 60'
        args = parse(arg)
        turtle.begin_fill()
        for i in range(2):
            turtle.forward(args[0])
            turtle.right(90)
            turtle.forward(args[1])
            turtle.right(90)
        turtle.end_fill()

    def do_poly(self, arg):
        'Draw polygon with given number of sides and and side-length:  POLY 6 50'
        args = parse(arg)
        turtle.begin_fill()
        num_sides = args[0]
        side_length = args[1]
        angle = 360.0 / num_sides

        for i in range(num_sides):
            turtle.forward(side_length)
            turtle.right(angle)
        turtle.end_fill()


    # ----- basic turtle commands -----
    def do_forward(self, arg):
        'Move the turtle forward by the specified distance:  FORWARD 10'
        turtle.forward(*parse(arg))
    def do_right(self, arg):
        'Turn turtle right by given number of degrees:  RIGHT 20'
        turtle.right(*parse(arg))
    def do_left(self, arg):
        'Turn turtle left by given number of degrees:  LEFT 90'
        turtle.left(*parse(arg))
    def do_setpos(self, arg):
        'Move turtle to an absolute position without painting.  SETPOS 100 200'
        turtle.up()
        turtle.setpos(*parse(arg))
        turtle.down()
    def do_goto(self, arg):
        'Move turtle to an absolute position with changing orientation.  GOTO 100 200'
        turtle.goto(*parse(arg))
    def do_home(self, arg):
        'Return turtle to the home postion:  HOME'
        turtle.home()
    def do_circle(self, arg):
        'Draw circle with given radius an options extent and steps:  CIRCLE 50'
        turtle.circle(*parse(arg))
    def do_position(self, arg):
        'Print the current turle position:  POSITION'
        print('Current position is %d %d\n' % turtle.position())
    def do_heading(self, arg):
        'Print the current turle heading in degrees:  HEADING'
        print('Current heading is %d\n' % (turtle.heading(),))
    def do_color(self, arg):
        'Set the color:  COLOR BLUE'
        turtle.color(arg.lower())
    def do_reset(self, arg):
        'Clear the screen and return turtle to center:  RESET'
        turtle.reset()
    def do_bye(self, arg):
        'Stop recording, close the turtle window, and exit:  BYE'
        print('Thank you for using Turtle')
        self.close()
        turtle.bye()
        return True

    # ----- record and playback -----
    def do_record(self, arg):
        'Save future commands to filename:  RECORD rose.cmd'
        self.file = open(arg, 'w')
    def do_playback(self, arg):
        'Playback commands from a file:  PLAYBACK rose.cmd'
        self.close()
        cmds = open(arg).read().splitlines()
        self.cmdqueue.extend(cmds)
    def precmd(self, line):
        line = line.lower()
        if self.file and 'playback' not in line:
            print(line, file=self.file)
        return line
    def close(self):
        if self.file:
            self.file.close()
            self.file = None

def parse(arg):
    'Convert a series of zero or more numbers to an argument tuple'
    return tuple(map(int, arg.split()))