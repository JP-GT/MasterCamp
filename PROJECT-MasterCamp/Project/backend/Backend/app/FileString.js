var avatar = document.createElement('avatar');
var height = 200;
var width  = 200;

avatar.width  = width;
avatar.height = height;

var ctx = avatar.getContext('2d');

ctx.strokeStyle = '#090';
ctx.beginPath();
ctx.arc(width/2, height/2, width/2 - width/10, 0, Math.PI*2);
ctx.stroke();

avatar.toBlob(function (blob) {
    var reader = new FileReader();

    reader.onload = function () {
        console.log(reader.result);
    }

    reader.readAsBinaryString(blob);
});