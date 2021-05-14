// import React, { Component } from 'react';
// import ROSLIB from 'roslib';
// import { FormControl, Select, MenuItem } from "@material-ui/core";
// import { makeStyles } from '@material-ui/core/styles';

// import { MJPEGCANVAS } from '../mjpegcanvas/build/mjpegcanvas.js';

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));

// export class VideoStream extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     	feedId: 1,
//     };
//     var classes = useStyles();
//   }

//   componentDidMount() {
//     var viewer = new MJPEGCANVAS.Viewer({
//       divID : 'mjpeg',
//       host : 'localhost',
//       height : 480,
//       width : 500,
//       topic : '/wide_stereo/left/image_color'
//     });
//   }

//   render() {
//     return (
//     	<div>
// 			<div id='mjpeg'/>
// 			<FormControl className={classes.formControl}>
// 		        <InputLabel id="demo-simple-select-label">Age</InputLabel>
// 		        <Select
// 		          labelId="demo-simple-select-label"
// 		          id="demo-simple-select"
// 		          value={age}
// 		          onChange={handleChange}
// 		        >
// 		          <MenuItem value={1}>One</MenuItem>
// 		          <MenuItem value={2}>Two</MenuItem>
// 		          <MenuItem value={3}>Three</MenuItem>
// 		        </Select>
// 		      </FormControl>
// 		</div>
//     );
//   }
// }
