; Auto-generated. Do not edit!


(cl:in-package rover-msg)


;//! \htmlinclude MotorState.msg.html

(cl:defclass <MotorState> (roslisp-msg-protocol:ros-message)
  ((header
    :reader header
    :initarg :header
    :type std_msgs-msg:Header
    :initform (cl:make-instance 'std_msgs-msg:Header))
   (vel_m1
    :reader vel_m1
    :initarg :vel_m1
    :type cl:fixnum
    :initform 0)
   (vel_m2
    :reader vel_m2
    :initarg :vel_m2
    :type cl:fixnum
    :initform 0)
   (vel_m3
    :reader vel_m3
    :initarg :vel_m3
    :type cl:fixnum
    :initform 0)
   (vel_m4
    :reader vel_m4
    :initarg :vel_m4
    :type cl:fixnum
    :initform 0)
   (vel_m5
    :reader vel_m5
    :initarg :vel_m5
    :type cl:fixnum
    :initform 0)
   (vel_m6
    :reader vel_m6
    :initarg :vel_m6
    :type cl:fixnum
    :initform 0))
)

(cl:defclass MotorState (<MotorState>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <MotorState>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'MotorState)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name rover-msg:<MotorState> is deprecated: use rover-msg:MotorState instead.")))

(cl:ensure-generic-function 'header-val :lambda-list '(m))
(cl:defmethod header-val ((m <MotorState>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader rover-msg:header-val is deprecated.  Use rover-msg:header instead.")
  (header m))

(cl:ensure-generic-function 'vel_m1-val :lambda-list '(m))
(cl:defmethod vel_m1-val ((m <MotorState>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader rover-msg:vel_m1-val is deprecated.  Use rover-msg:vel_m1 instead.")
  (vel_m1 m))

(cl:ensure-generic-function 'vel_m2-val :lambda-list '(m))
(cl:defmethod vel_m2-val ((m <MotorState>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader rover-msg:vel_m2-val is deprecated.  Use rover-msg:vel_m2 instead.")
  (vel_m2 m))

(cl:ensure-generic-function 'vel_m3-val :lambda-list '(m))
(cl:defmethod vel_m3-val ((m <MotorState>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader rover-msg:vel_m3-val is deprecated.  Use rover-msg:vel_m3 instead.")
  (vel_m3 m))

(cl:ensure-generic-function 'vel_m4-val :lambda-list '(m))
(cl:defmethod vel_m4-val ((m <MotorState>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader rover-msg:vel_m4-val is deprecated.  Use rover-msg:vel_m4 instead.")
  (vel_m4 m))

(cl:ensure-generic-function 'vel_m5-val :lambda-list '(m))
(cl:defmethod vel_m5-val ((m <MotorState>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader rover-msg:vel_m5-val is deprecated.  Use rover-msg:vel_m5 instead.")
  (vel_m5 m))

(cl:ensure-generic-function 'vel_m6-val :lambda-list '(m))
(cl:defmethod vel_m6-val ((m <MotorState>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader rover-msg:vel_m6-val is deprecated.  Use rover-msg:vel_m6 instead.")
  (vel_m6 m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <MotorState>) ostream)
  "Serializes a message object of type '<MotorState>"
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'header) ostream)
  (cl:let* ((signed (cl:slot-value msg 'vel_m1)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 65536) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    )
  (cl:let* ((signed (cl:slot-value msg 'vel_m2)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 65536) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    )
  (cl:let* ((signed (cl:slot-value msg 'vel_m3)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 65536) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    )
  (cl:let* ((signed (cl:slot-value msg 'vel_m4)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 65536) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    )
  (cl:let* ((signed (cl:slot-value msg 'vel_m5)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 65536) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    )
  (cl:let* ((signed (cl:slot-value msg 'vel_m6)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 65536) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    )
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <MotorState>) istream)
  "Deserializes a message object of type '<MotorState>"
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'header) istream)
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'vel_m1) (cl:if (cl:< unsigned 32768) unsigned (cl:- unsigned 65536))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'vel_m2) (cl:if (cl:< unsigned 32768) unsigned (cl:- unsigned 65536))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'vel_m3) (cl:if (cl:< unsigned 32768) unsigned (cl:- unsigned 65536))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'vel_m4) (cl:if (cl:< unsigned 32768) unsigned (cl:- unsigned 65536))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'vel_m5) (cl:if (cl:< unsigned 32768) unsigned (cl:- unsigned 65536))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'vel_m6) (cl:if (cl:< unsigned 32768) unsigned (cl:- unsigned 65536))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<MotorState>)))
  "Returns string type for a message object of type '<MotorState>"
  "rover/MotorState")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'MotorState)))
  "Returns string type for a message object of type 'MotorState"
  "rover/MotorState")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<MotorState>)))
  "Returns md5sum for a message object of type '<MotorState>"
  "ec31efcca2da3deeb4742af5aa171d40")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'MotorState)))
  "Returns md5sum for a message object of type 'MotorState"
  "ec31efcca2da3deeb4742af5aa171d40")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<MotorState>)))
  "Returns full string definition for message of type '<MotorState>"
  (cl:format cl:nil "Header header~%int16 vel_m1~%int16 vel_m2~%int16 vel_m3~%int16 vel_m4~%int16 vel_m5~%int16 vel_m6~%================================================================================~%MSG: std_msgs/Header~%# Standard metadata for higher-level stamped data types.~%# This is generally used to communicate timestamped data ~%# in a particular coordinate frame.~%# ~%# sequence ID: consecutively increasing ID ~%uint32 seq~%#Two-integer timestamp that is expressed as:~%# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')~%# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')~%# time-handling sugar is provided by the client library~%time stamp~%#Frame this data is associated with~%string frame_id~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'MotorState)))
  "Returns full string definition for message of type 'MotorState"
  (cl:format cl:nil "Header header~%int16 vel_m1~%int16 vel_m2~%int16 vel_m3~%int16 vel_m4~%int16 vel_m5~%int16 vel_m6~%================================================================================~%MSG: std_msgs/Header~%# Standard metadata for higher-level stamped data types.~%# This is generally used to communicate timestamped data ~%# in a particular coordinate frame.~%# ~%# sequence ID: consecutively increasing ID ~%uint32 seq~%#Two-integer timestamp that is expressed as:~%# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')~%# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')~%# time-handling sugar is provided by the client library~%time stamp~%#Frame this data is associated with~%string frame_id~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <MotorState>))
  (cl:+ 0
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'header))
     2
     2
     2
     2
     2
     2
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <MotorState>))
  "Converts a ROS message object to a list"
  (cl:list 'MotorState
    (cl:cons ':header (header msg))
    (cl:cons ':vel_m1 (vel_m1 msg))
    (cl:cons ':vel_m2 (vel_m2 msg))
    (cl:cons ':vel_m3 (vel_m3 msg))
    (cl:cons ':vel_m4 (vel_m4 msg))
    (cl:cons ':vel_m5 (vel_m5 msg))
    (cl:cons ':vel_m6 (vel_m6 msg))
))
