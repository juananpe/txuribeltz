let bideoa = document.getElementById("bideoa");
let oihala = document.getElementById("oihala");
let buffer = oihala.getContext("2d");
let play = document.getElementById("play");
let pause = document.getElementById("pause");
let txuribeltzOihala = document.getElementById("txuribeltza");
let txuribeltza = txuribeltzOihala.getContext("2d");

let erlojua;

play.onclick = function () {
  bideoa.play();
};

pause.onclick = function () {
  bideoa.pause();
};

function txuribeltzez(pos, r, g, b, data) {
  var grisa = (r + g + b) / 3;
  data[pos * 4 + 0] = grisa;
  data[pos * 4 + 1] = grisa;
  data[pos * 4 + 2] = grisa;
}

bideoa.addEventListener("play", function () {
  erlojua = setInterval(function () {
    buffer.drawImage(bideoa, 0, 0, 160, 120);

    var frame = buffer.getImageData(0, 0, 320, 120);
    var length = frame.data.length / 4;

    txuribeltza.clearRect(0, 0, 100, 100);
    txuribeltza.fillText("Welcome", 140, 100);
    
    for (let i = 0; i < length; i++) {
      let r = frame.data[i * 4 + 0];
      let g = frame.data[i * 4 + 1];
      let b = frame.data[i * 4 + 2];

      txuribeltzez(i, r, g, b, frame.data);
    }

    txuribeltza.putImageData(frame, 0, 0);
  }, 0);
});
bideoa.addEventListener("pause", function () {
  clearInterval(erlojua);
});
bideoa.addEventListener("ended", function () {
  clearInterval(erlojua);
});
