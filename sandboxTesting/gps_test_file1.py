import gps

#if the GPS is not running, you may have to input these commands into the terminal:
#sudo killall gpsd
#sudo gpsd /dev/serial0/ -F /var/run/gpsd.sock
#This simply restarts the gpsd and prepares it for the output this program uses.

#Listens to gpsd
session = gps.gps("localhost","2947")
session.stream(gps.WATCH_ENABLE | gps.WATCH_NEWSTYLE)

while True:
    try:
        report = session.next()
        if report['class'] == 'TPV':
            if hasattr(report, 'lon'):
                longitude = report.lon
            if hasattr(report, 'lat'):
                latitude = report.lat
            print("longitude:" + str(longitude) + ". latitude:" + str(latitude) + ".")
    except KeyError:
        pass
    except KeyboardInterrupt:
        quit()
    except StopIteration:
        session = None
        print("GPSD has terminated")
