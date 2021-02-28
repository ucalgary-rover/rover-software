;; Auto-generated. Do not edit!


(when (boundp 'rover::GpsCoords)
  (if (not (find-package "ROVER"))
    (make-package "ROVER"))
  (shadow 'GpsCoords (find-package "ROVER")))
(unless (find-package "ROVER::GPSCOORDS")
  (make-package "ROVER::GPSCOORDS"))

(in-package "ROS")
;;//! \htmlinclude GpsCoords.msg.html
(if (not (find-package "STD_MSGS"))
  (ros::roseus-add-msgs "std_msgs"))


(defclass rover::GpsCoords
  :super ros::object
  :slots (_header _lat _lon ))

(defmethod rover::GpsCoords
  (:init
   (&key
    ((:header __header) (instance std_msgs::Header :init))
    ((:lat __lat) 0.0)
    ((:lon __lon) 0.0)
    )
   (send-super :init)
   (setq _header __header)
   (setq _lat (float __lat))
   (setq _lon (float __lon))
   self)
  (:header
   (&rest __header)
   (if (keywordp (car __header))
       (send* _header __header)
     (progn
       (if __header (setq _header (car __header)))
       _header)))
  (:lat
   (&optional __lat)
   (if __lat (setq _lat __lat)) _lat)
  (:lon
   (&optional __lon)
   (if __lon (setq _lon __lon)) _lon)
  (:serialization-length
   ()
   (+
    ;; std_msgs/Header _header
    (send _header :serialization-length)
    ;; float64 _lat
    8
    ;; float64 _lon
    8
    ))
  (:serialize
   (&optional strm)
   (let ((s (if strm strm
              (make-string-output-stream (send self :serialization-length)))))
     ;; std_msgs/Header _header
       (send _header :serialize s)
     ;; float64 _lat
       (sys::poke _lat (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; float64 _lon
       (sys::poke _lon (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;;
     (if (null strm) (get-output-stream-string s))))
  (:deserialize
   (buf &optional (ptr- 0))
   ;; std_msgs/Header _header
     (send _header :deserialize buf ptr-) (incf ptr- (send _header :serialization-length))
   ;; float64 _lat
     (setq _lat (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; float64 _lon
     (setq _lon (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;;
   self)
  )

(setf (get rover::GpsCoords :md5sum-) "47cf9e73769a8bd608378ba8f197aee9")
(setf (get rover::GpsCoords :datatype-) "rover/GpsCoords")
(setf (get rover::GpsCoords :definition-)
      "Header header
float64 lat
float64 lon
================================================================================
MSG: std_msgs/Header
# Standard metadata for higher-level stamped data types.
# This is generally used to communicate timestamped data 
# in a particular coordinate frame.
# 
# sequence ID: consecutively increasing ID 
uint32 seq
#Two-integer timestamp that is expressed as:
# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')
# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')
# time-handling sugar is provided by the client library
time stamp
#Frame this data is associated with
string frame_id

")



(provide :rover/GpsCoords "47cf9e73769a8bd608378ba8f197aee9")


