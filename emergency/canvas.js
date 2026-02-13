const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1080;
canvas.height = 1920;

const bg = new Image();
bg.src = localStorage.getItem("wallpaperImage");

const data = JSON.parse(localStorage.getItem("emergencyData"));

const qrText = `
EMERGENCY INFO

Name: ${data.name}
Blood: ${data.blood}
Allergies: ${data.allergies || "None"}

Contact:
${data.contactName}
${data.contactNumber}
`.trim();

let qrX = 390, qrY = 1250, qrSize = 300;
const qrImg = new Image();

QRCode.toDataURL(qrText, { width: qrSize }, (_, url) => {
  qrImg.src = url;
  bg.onload = draw;
  qrImg.onload = draw;
});

function draw() {
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.fillRect(qrX - 20, qrY - 20, qrSize + 40, qrSize + 40);
  ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);
}

canvas.onclick = e => {
  const r = canvas.getBoundingClientRect();
  qrX = (e.clientX - r.left) * (canvas.width / r.width) - qrSize / 2;
  qrY = (e.clientY - r.top) * (canvas.height / r.height) - qrSize / 2;
  draw();
};

downloadBtn.onclick = () => {
  const a = document.createElement("a");
  a.download = "emergency-lockscreen.png";
  a.href = canvas.toDataURL();
  a.click();
};
