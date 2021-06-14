
/*function add_map() {
    var src = "https://images-na.ssl-images-amazon.com/images/I/61GaHo-zgQL._AC_SL1000_.jpg";
    show_image(src, 2500,1000, "Map");
}

//$(document).ready(function() {
//    document.getElementsByClassName("myImg")[0].src = "hackanm.gif";
//});

function show_image(src, width, height, alt) {
    var img = document.createElement("img");
    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = alt;
    document.body.appendChild(img);
}*/

function showMap(){
  document.getElementById('bigImage').src='https://images-na.ssl-images-amazon.com/images/I/61GaHo-zgQL._AC_SL1000_.jpg';
  document.getElementById('small1Image').src='https://i.ytimg.com/vi/z4ZLkyTuX_w/maxresdefault.jpg';
  document.getElementById('small2Image').src='https://image.freepik.com/free-photo/man-is-sitting-wooden-bench-he-looks-sea-back-view_183270-78.jpg';
}

function showView1(){
  document.getElementById('bigImage').src='https://i.ytimg.com/vi/z4ZLkyTuX_w/maxresdefault.jpg';
  document.getElementById('small1Image').src='https://images-na.ssl-images-amazon.com/images/I/61GaHo-zgQL._AC_SL1000_.jpg';
  document.getElementById('small2Image').src='https://image.freepik.com/free-photo/man-is-sitting-wooden-bench-he-looks-sea-back-view_183270-78.jpg';
}

function showView2(){
  document.getElementById('bigImage').src='https://image.freepik.com/free-photo/man-is-sitting-wooden-bench-he-looks-sea-back-view_183270-78.jpg';
  document.getElementById('small1Image').src='https://images-na.ssl-images-amazon.com/images/I/61GaHo-zgQL._AC_SL1000_.jpg';
  document.getElementById('small2Image').src='https://i.ytimg.com/vi/z4ZLkyTuX_w/maxresdefault.jpg';
}
