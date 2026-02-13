const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1080;
canvas.height = 1920;

const wallpaper = localStorage.getItem("wallpaperImage");
const data = JSON.parse(localStorage.getItem("emergencyData"));

if (!wallpaper || !data) {
  alert("Missing data. Go back and fill form again.");
}

// Encode emergency info into URL
const encoded = btoa(JSON.stringify(data));
const emergencyURL = `${window.location.origin}/emergency.html?data=${encoded}`;

const bgImg = new Image();
const qrImg = new Image();

let qrX = 390;
let qrY = 1250;
const qrSize = 300;

bgImg.src = wallpaper;

QRCode.toDataURL(emergencyURL, { width: qrSize }, (err, url) => {
  qrImg.src = url;

  bgImg.onload = draw;
  qrImg.onload = draw;
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

  ctx.font = "36px Arial";
  ctx.fillStyle = "#000";
  ctx.textAlign = "center";
  ctx.fillText("Scan for Emergency Info", canvas.width / 2, qrY - 20);
}

// Click to move QR
canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  qrX = (e.clientX - rect.left) * scaleX - qrSize / 2;
  qrY = (e.clientY - rect.top) * scaleY - qrSize / 2;

  draw();
});

// Download image
document.getElementById("downloadBtn").addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "emergency-lockscreen.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});
