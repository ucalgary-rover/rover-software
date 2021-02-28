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

class MotorState {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.header = null;
      this.vel_m1 = null;
      this.vel_m2 = null;
      this.vel_m3 = null;
      this.vel_m4 = null;
      this.vel_m5 = null;
      this.vel_m6 = null;
    }
    else {
      if (initObj.hasOwnProperty('header')) {
        this.header = initObj.header
      }
      else {
        this.header = new std_msgs.msg.Header();
      }
      if (initObj.hasOwnProperty('vel_m1')) {
        this.vel_m1 = initObj.vel_m1
      }
      else {
        this.vel_m1 = 0;
      }
      if (initObj.hasOwnProperty('vel_m2')) {
        this.vel_m2 = initObj.vel_m2
      }
      else {
        this.vel_m2 = 0;
      }
      if (initObj.hasOwnProperty('vel_m3')) {
        this.vel_m3 = initObj.vel_m3
      }
      else {
        this.vel_m3 = 0;
      }
      if (initObj.hasOwnProperty('vel_m4')) {
        this.vel_m4 = initObj.vel_m4
      }
      else {
        this.vel_m4 = 0;
      }
      if (initObj.hasOwnProperty('vel_m5')) {
        this.vel_m5 = initObj.vel_m5
      }
      else {
        this.vel_m5 = 0;
      }
      if (initObj.hasOwnProperty('vel_m6')) {
        this.vel_m6 = initObj.vel_m6
      }
      else {
        this.vel_m6 = 0;
      }
    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type MotorState
    // Serialize message field [header]
    bufferOffset = std_msgs.msg.Header.serialize(obj.header, buffer, bufferOffset);
    // Serialize message field [vel_m1]
    bufferOffset = _serializer.int16(obj.vel_m1, buffer, bufferOffset);
    // Serialize message field [vel_m2]
    bufferOffset = _serializer.int16(obj.vel_m2, buffer, bufferOffset);
    // Serialize message field [vel_m3]
    bufferOffset = _serializer.int16(obj.vel_m3, buffer, bufferOffset);
    // Serialize message field [vel_m4]
    bufferOffset = _serializer.int16(obj.vel_m4, buffer, bufferOffset);
    // Serialize message field [vel_m5]
    bufferOffset = _serializer.int16(obj.vel_m5, buffer, bufferOffset);
    // Serialize message field [vel_m6]
    bufferOffset = _serializer.int16(obj.vel_m6, buffer, bufferOffset);
    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    //deserializes a message object of type MotorState
    let len;
    let data = new MotorState(null);
    // Deserialize message field [header]
    data.header = std_msgs.msg.Header.deserialize(buffer, bufferOffset);
    // Deserialize message field [vel_m1]
    data.vel_m1 = _deserializer.int16(buffer, bufferOffset);
    // Deserialize message field [vel_m2]
    data.vel_m2 = _deserializer.int16(buffer, bufferOffset);
    // Deserialize message field [vel_m3]
    data.vel_m3 = _deserializer.int16(buffer, bufferOffset);
    // Deserialize message field [vel_m4]
    data.vel_m4 = _deserializer.int16(buffer, bufferOffset);
    // Deserialize message field [vel_m5]
    data.vel_m5 = _deserializer.int16(buffer, bufferOffset);
    // Deserialize message field [vel_m6]
    data.vel_m6 = _deserializer.int16(buffer, bufferOffset);
    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    length += std_msgs.msg.Header.getMessageSize(object.header);
    return length + 12;
  }

  static datatype() {
    // Returns string type for a message object
    return 'rover/MotorState';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return 'ec31efcca2da3deeb4742af5aa171d40';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    Header header
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
    
    `;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new MotorState(null);
    if (msg.header !== undefined) {
      resolved.header = std_msgs.msg.Header.Resolve(msg.header)
    }
    else {
      resolved.header = new std_msgs.msg.Header()
    }

    if (msg.vel_m1 !== undefined) {
      resolved.vel_m1 = msg.vel_m1;
    }
    else {
      resolved.vel_m1 = 0
    }

    if (msg.vel_m2 !== undefined) {
      resolved.vel_m2 = msg.vel_m2;
    }
    else {
      resolved.vel_m2 = 0
    }

    if (msg.vel_m3 !== undefined) {
      resolved.vel_m3 = msg.vel_m3;
    }
    else {
      resolved.vel_m3 = 0
    }

    if (msg.vel_m4 !== undefined) {
      resolved.vel_m4 = msg.vel_m4;
    }
    else {
      resolved.vel_m4 = 0
    }

    if (msg.vel_m5 !== undefined) {
      resolved.vel_m5 = msg.vel_m5;
    }
    else {
      resolved.vel_m5 = 0
    }

    if (msg.vel_m6 !== undefined) {
      resolved.vel_m6 = msg.vel_m6;
    }
    else {
      resolved.vel_m6 = 0
    }

    return resolved;
    }
};

module.exports = MotorState;
