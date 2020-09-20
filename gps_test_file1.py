import gps

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