;; Auto-generated. Do not edit!


(when (boundp 'rover::MotorState)
  (if (not (find-package "ROVER"))
    (make-package "ROVER"))
  (shadow 'MotorState (find-package "ROVER")))
(unless (find-package "ROVER::MOTORSTATE")
  (make-package "ROVER::MOTORSTATE"))

(in-package "ROS")
;;//! \htmlinclude MotorState.msg.html
(if (not (find-package "STD_MSGS"))
  (ros::roseus-add-msgs "std_msgs"))


(defclass rover::MotorState
  :super ros::object
  :slots (_header _vel_m1 _vel_m2 _vel_m3 _vel_m4 _vel_m5 _vel_m6 ))

(defmethod rover::MotorState
  (:init
   (&key
    ((:header __header) (instance std_msgs::Header :init))
    ((:vel_m1 __vel_m1) 0)
    ((:vel_m2 __vel_m2) 0)
    ((:vel_m3 __vel_m3) 0)
    ((:vel_m4 __vel_m4) 0)
    ((:vel_m5 __vel_m5) 0)
    ((:vel_m6 __vel_m6) 0)
    )
   (send-super :init)
   (setq _header __header)
   (setq _vel_m1 (round __vel_m1))
   (setq _vel_m2 (round __vel_m2))
   (setq _vel_m3 (round __vel_m3))
   (setq _vel_m4 (round __vel_m4))
   (setq _vel_m5 (round __vel_m5))
   (setq _vel_m6 (round __vel_m6))
   self)
  (:header
   (&rest __header)
   (if (keywordp (car __header))
       (send* _header __header)
     (progn
       (if __header (setq _header (car __header)))
       _header)))
  (:vel_m1
   (&optional __vel_m1)
   (if __vel_m1 (setq _vel_m1 __vel_m1)) _vel_m1)
  (:vel_m2
   (&optional __vel_m2)
   (if __vel_m2 (setq _vel_m2 __vel_m2)) _vel_m2)
  (:vel_m3
   (&optional __vel_m3)
   (if __vel_m3 (setq _vel_m3 __vel_m3)) _vel_m3)
  (:vel_m4
   (&optional __vel_m4)
   (if __vel_m4 (setq _vel_m4 __vel_m4)) _vel_m4)
  (:vel_m5
   (&optional __vel_m5)
   (if __vel_m5 (setq _vel_m5 __vel_m5)) _vel_m5)
  (:vel_m6
   (&optional __vel_m6)
   (if __vel_m6 (setq _vel_m6 __vel_m6)) _vel_m6)
  (:serialization-length
   ()
   (+
    ;; std_msgs/Header _header
    (send _header :serialization-length)
    ;; int16 _vel_m1
    2
    ;; int16 _vel_m2
    2
    ;; int16 _vel_m3
    2
    ;; int16 _vel_m4
    2
    ;; int16 _vel_m5
    2
    ;; int16 _vel_m6
    2
    ))
  (:serialize
   (&optional strm)
   (let ((s (if strm strm
              (make-string-output-stream (send self :serialization-length)))))
     ;; std_msgs/Header _header
       (send _header :serialize s)
     ;; int16 _vel_m1
       (write-word _vel_m1 s)
     ;; int16 _vel_m2
       (write-word _vel_m2 s)
     ;; int16 _vel_m3
       (write-word _vel_m3 s)
     ;; int16 _vel_m4
       (write-word _vel_m4 s)
     ;; int16 _vel_m5
       (write-word _vel_m5 s)
     ;; int16 _vel_m6
       (write-word _vel_m6 s)
     ;;
     (if (null strm) (get-output-stream-string s))))
  (:deserialize
   (buf &optional (ptr- 0))
   ;; std_msgs/Header _header
     (send _header :deserialize buf ptr-) (incf ptr- (send _header :serialization-length))
   ;; int16 _vel_m1
     (setq _vel_m1 (sys::peek buf ptr- :short)) (incf ptr- 2)
   ;; int16 _vel_m2
     (setq _vel_m2 (sys::peek buf ptr- :short)) (incf ptr- 2)
   ;; int16 _vel_m3
     (setq _vel_m3 (sys::peek buf ptr- :short)) (incf ptr- 2)
   ;; int16 _vel_m4
     (setq _vel_m4 (sys::peek buf ptr- :short)) (incf ptr- 2)
   ;; int16 _vel_m5
     (setq _vel_m5 (sys::peek buf ptr- :short)) (incf ptr- 2)
   ;; int16 _vel_m6
     (setq _vel_m6 (sys::peek buf ptr- :short)) (incf ptr- 2)
   ;;
   self)
  )

(setf (get rover::MotorState :md5sum-) "ec31efcca2da3deeb4742af5aa171d40")
(setf (get rover::MotorState :datatype-) "rover/MotorState")
(setf (get rover::MotorState :definition-)
      "Header header
int16 vel_m1
int16 vel_m2
int16 vel_m3
int16 vel_m4
int16 vel_m5
int16 vel_m6
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



(provide :rover/MotorState "ec31efcca2da3deeb4742af5aa171d40")


