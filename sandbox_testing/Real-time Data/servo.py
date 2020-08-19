import RPi.GPIO as GPIO
class Servo:

    servoPIN = 17
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(servoPIN, GPIO.OUT)

    p = GPIO.PWM(servoPIN, 50)
    p.start(2.5)

    def __init__(self):
        pass

    def set_rotation(self, value):
        self.p.ChangeDutyCycle(value)

    def end_use(self):
        self.p.stop()
        GPIO.cleanup()