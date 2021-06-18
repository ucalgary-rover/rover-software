from pyPS4Controller.controller import Controller
import math

from Phidget22.Phidget import*
from Phidget22.Devices.Stepper import*
from Phidget22.PhidgetException import*
from Phidget22.Devices.Log import*
from Phidget22.LogLevel import*
import time

import traceback

baseM = Stepper()
LshoulderM = Stepper()
RshoulderM = Stepper()
elbowM = Stepper()
wristRotM = Stepper()
clawPinM = Stepper()

class MyController(Controller):

    def __init__(self, **kwargs):
        Controller.__init__(self, **kwargs)

    def on_x_press(self):
        elbowM.setEngaged(True)
        elbowM.setVelocityLimit(100000)

    def on_x_release(self):
        elbowM.setVelocityLimit(0)
        elbowM.setEngaged(False)
        
    def on_circle_press(self):
        elbowM.setEngaged(True)
        elbowM.setVelocityLimit(-100000)

    def on_circle_release(self):
        elbowM.setVelocityLimit(0)
        elbowM.setEngaged(False)
        
    def on_L2_press(self, value):
        val = abs((value + 32767) / 65535)
        baseM.setEngaged(True)
        baseM.setVelocityLimit(100000 * val)

    def on_L2_release(self):
        baseM.setVelocityLimit(0)
        baseM.setEngaged(False)
        
    def on_R2_press(self, value):
        val = abs((value + 32767) / 65535)
        baseM.setEngaged(True)
        baseM.setVelocityLimit(-100000 * val)

    def on_R2_release(self):
        baseM.setVelocityLimit(0)
        baseM.setEngaged(False)
       
    def on_L3_up(self, value):
        val = abs(value / 32767)
        wristRotM.setEngaged(True)
        wristRotM.setVelocityLimit(100000 * val)
        
    def on_L3_down(self, value):
        val = abs(value / 32767)
        wristRotM.setEngaged(True)
        wristRotM.setVelocityLimit(-100000 * val)

    def on_L3_y_at_rest(self):
        wristRotM.setVelocityLimit(0)
        wristRotM.setEngaged(False)

def onAttach(self):
    print("Attach?")
    
def onDetach(self):
    print("Detach!")
    
def onError(self, code, description):
    print("COde: " + ErrorEventCode.getName(code))
    print("Description: " + str(description))
    print("----PERIODTT----")

def main ():
    try:
        Log.enable(LogLevel.PHIDGET_LOG_INFO, "phidgetlog.log")
        global baseM, LshoulderM, RshoulderM, elbowM, wristRotM, clawPinM
        
        baseM.setDeviceSerialNumber(620000)
        baseM.setHubPort(2)
        elbowM.setDeviceSerialNumber(620000)
        elbowM.setHubPort(1)
        wristRotM.setDeviceSerialNumber(620000)
        wristRotM.setHubPort(0)
        
        baseM.setOnAttachHandler(onAttach)
        baseM.setOnDetachHandler(onDetach)
        baseM.setOnErrorHandler(onError)
        elbowM.setOnAttachHandler(onAttach)
        elbowM.setOnDetachHandler(onDetach)
        elbowM.setOnErrorHandler(onError)
        wristRotM.setOnAttachHandler(onAttach)
        wristRotM.setOnDetachHandler(onDetach)
        wristRotM.setOnErrorHandler(onError)
        
        baseM.openWaitForAttachment(5000)
        elbowM.openWaitForAttachment(5000)
        wristRotM.openWaitForAttachment(5000)
        
        baseM.setCurrentLimit(2.8)
        baseM.setHoldingCurrentLimit(0)
        baseM.setControlMode(StepperControlMode.CONTROL_MODE_RUN)
        #baseM.setRescaleFactor(4.058441558 * pow(10,-6))
        baseM.setAcceleration(50000)
        baseM.setVelocityLimit(0)
        
        elbowM.setCurrentLimit(0.67)
        elbowM.setHoldingCurrentLimit(0)
        elbowM.setControlMode(StepperControlMode.CONTROL_MODE_RUN)
        #elbowM.setRescaleFactor(3.125 * pow(10,-6))
        elbowM.setAcceleration(50000)
        elbowM.setVelocityLimit(0)
        
        wristRotM.setCurrentLimit(0.67)
        wristRotM.setHoldingCurrentLimit(0)
        wristRotM.setControlMode(StepperControlMode.CONTROL_MODE_RUN)
        #wristRotM.setRescaleFactor(3.125 * pow(10,-4))
        wristRotM.setAcceleration(50000)
        wristRotM.setVelocityLimit(0)
        
        baseM.setEngaged(True)
        elbowM.setEngaged(True)
        wristRotM.setEngaged(True)
         
        controller = MyController(interface="/dev/input/js0", connecting_using_ds4drv=False)
        # you can start listening before controller is paired, as long as you pair it within the timeout window
        controller.listen(timeout=60)
        
        baseM.close()
        elbowM.close()
        wristRotM.close()
        
    except PhidgetException as ex:
        traceback.print_exc()
        print("")
        print("PhidgetException " + str(ex.code) + " (" + ex.description + "): " + ex.details)
        
main()
