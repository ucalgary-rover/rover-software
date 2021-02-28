// Auto-generated. Do not edit!

// (in-package rover.msg)


"use strict";

const _serializer = _ros_msg_utils.Serialize;
const _arraySerializer = _serializer.Array;
const _deserializer = _ros_msg_utils.Deserialize;
const _arrayDeserializer = _deserializer.Array;
const _finder = _ros_msg_utils.Find;
const _getByteLength = _ros_msg_utils.getByteLength;
let std_msgs = _finder('std_msgs');

//-----------------------------------------------------------

class DriveControls {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.header = null;
      this.vel_x = null;
      this.vel_y = null;
    }
    else {
      if (initObj.hasOwnProperty('header')) {
        this.header = initObj.header
      }
      else {
        this.header = new std_msgs.msg.Header();
      }
      if (initObj.hasOwnProperty('vel_x')) {
        this.vel_x = initObj.vel_x
      }
      else {
        this.vel_x = 0.0;
      }
      if (initObj.hasOwnProperty('vel_y')) {
        this.vel_y = initObj.vel_y
      }
      else {
        this.vel_y = 0.0;
      }
    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type DriveControls
    // Serialize message field [header]
    bufferOffset = std_msgs.msg.Header.serialize(obj.header, buffer, bufferOffset);
    // Serialize message field [vel_x]
    bufferOffset = _serializer.float64(obj.vel_x, buffer, bufferOffset);
    // Serialize message field [vel_y]
    bufferOffset = _serializer.float64(obj.vel_y, buffer, bufferOffset);
    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    //deserializes a message object of type DriveControls
    let len;
    let data = new DriveControls(null);
    // Deserialize message field [header]
    data.header = std_msgs.msg.Header.deserialize(buffer, bufferOffset);
    // Deserialize message field [vel_x]
    data.vel_x = _deserializer.float64(buffer, bufferOffset);
    // Deserialize message field [vel_y]
    data.vel_y = _deserializer.float64(buffer, bufferOffset);
    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    length += std_msgs.msg.Header.getMessageSize(object.header);
    return length + 16;
  }

  static datatype() {
    // Returns string type for a message object
    return 'rover/DriveControls';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '13b346a0afd746bdf1dea85efd012393';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    Header header
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
    
    `;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new DriveControls(null);
    if (msg.header !== undefined) {
      resolved.header = std_msgs.msg.Header.Resolve(msg.header)
    }
    else {
      resolved.header = new std_msgs.msg.Header()
    }

    if (msg.vel_x !== undefined) {
      resolved.vel_x = msg.vel_x;
    }
    else {
      resolved.vel_x = 0.0
    }

    if (msg.vel_y !== undefined) {
      resolved.vel_y = msg.vel_y;
    }
    else {
      resolved.vel_y = 0.0
    }

    return resolved;
    }
};

module.exports = DriveControls;
