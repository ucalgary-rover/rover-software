;; Auto-generated. Do not edit!


(when (boundp 'rover::DriveControls)
  (if (not (find-package "ROVER"))
    (make-package "ROVER"))
  (shadow 'DriveControls (find-package "ROVER")))
(unless (find-package "ROVER::DRIVECONTROLS")
  (make-package "ROVER::DRIVECONTROLS"))

(in-package "ROS")
;;//! \htmlinclude DriveControls.msg.html
(if (not (find-package "STD_MSGS"))
  (ros::roseus-add-msgs "std_msgs"))


(defclass rover::DriveControls
  :super ros::object
  :slots (_header _vel_x _vel_y ))

(defmethod rover::DriveControls
  (:init
   (&key
    ((:header __header) (instance std_msgs::Header :init))
    ((:vel_x __vel_x) 0.0)
    ((:vel_y __vel_y) 0.0)
    )
   (send-super :init)
   (setq _header __header)
   (setq _vel_x (float __vel_x))
   (setq _vel_y (float __vel_y))
   self)
  (:header
   (&rest __header)
   (if (keywordp (car __header))
       (send* _header __header)
     (progn
       (if __header (setq _header (car __header)))
       _header)))
  (:vel_x
   (&optional __vel_x)
   (if __vel_x (setq _vel_x __vel_x)) _vel_x)
  (:vel_y
   (&optional __vel_y)
   (if __vel_y (setq _vel_y __vel_y)) _vel_y)
  (:serialization-length
   ()
   (+
    ;; std_msgs/Header _header
    (send _header :serialization-length)
    ;; float64 _vel_x
    8
    ;; float64 _vel_y
    8
    ))
  (:serialize
   (&optional strm)
   (let ((s (if strm strm
              (make-string-output-stream (send self :serialization-length)))))
     ;; std_msgs/Header _header
       (send _header :serialize s)
     ;; float64 _vel_x
       (sys::poke _vel_x (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; float64 _vel_y
       (sys::poke _vel_y (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;;
     (if (null strm) (get-output-stream-string s))))
  (:deserialize
   (buf &optional (ptr- 0))
   ;; std_msgs/Header _header
     (send _header :deserialize buf ptr-) (incf ptr- (send _header :serialization-length))
   ;; float64 _vel_x
     (setq _vel_x (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; float64 _vel_y
     (setq _vel_y (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;;
   self)
  )

(setf (get rover::DriveControls :md5sum-) "13b346a0afd746bdf1dea85efd012393")
(setf (get rover::DriveControls :datatype-) "rover/DriveControls")
(setf (get rover::DriveControls :definition-)
      "Header header
float64 vel_x
float64 vel_y
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



(provide :rover/DriveControls "13b346a0afd746bdf1dea85efd012393")


