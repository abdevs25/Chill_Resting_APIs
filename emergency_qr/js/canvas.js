const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1080;
canvas.height = 1920;

const bgImg = new Image();
const qrImg = new Image();

bgImg.src = localStorage.getItem("userWallpaper");
qrImg.src = localStorage.getItem("qrImage");

bgImg.onload = () => {
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

  qrImg.onload = () => {
    ctx.drawImage(qrImg, 390, 1250, 300, 300);

    ctx.font = "36px Arial";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.fillText("Scan for Emergency Info", 540, 1200);
  };
};

function downloadImage() {
  const link = document.createElement("a");
  link.download = "emergency-lockscreen.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}
