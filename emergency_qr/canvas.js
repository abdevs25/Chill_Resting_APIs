const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1080;
canvas.height = 1920;

const wallpaperSrc = localStorage.getItem("wallpaperImage");
const data = JSON.parse(localStorage.getItem("emergencyData"));

if (!wallpaperSrc || !data) {
  alert("Missing data. Please start again.");
  window.location.href = "index.html";
}

const qrText = `
🚨 EMERGENCY INFORMATION

Name: ${data.name}
Blood Group: ${data.blood}
Allergies: ${data.allergies || "None"}

Emergency Contact:
${data.contactName}
${data.contactNumber}
`.trim();

const bgImg = new Image();
const qrImg = new Image();

let qrSize = 300;
let qrX = 390;
let qrY = 1250;

bgImg.src = wallpaperSrc;

QRCode.toDataURL(qrText, { width: qrSize }, (err, qrUrl) => {
  if (err) {
    console.error(err);
    return;
  }
  qrImg.src = qrUrl;
  bgImg.onload = draw;
  qrImg.onload = draw;
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

  // QR background for contrast
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.fillRect(qrX - 20, qrY - 20, qrSize + 40, qrSize + 40);

  ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

  // Label text
  ctx.font = "bold 36px Arial";
  ctx.textAlign = "center";
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 4;
  ctx.fillStyle = "#fff";

  ctx.strokeText("Scan for Emergency Info", canvas.width / 2, qrY - 30);
  ctx.fillText("Scan for Emergency Info", canvas.width / 2, qrY - 30);
}

// Move QR on click
canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  qrX = (e.clientX - rect.left) * scaleX - qrSize / 2;
  qrY = (e.clientY - rect.top) * scaleY - qrSize / 2;

  draw();
});

// Download image
document.getElementById("downloadBtn").onclick = () => {
  const link = document.createElement("a");
  link.download = "emergency-lockscreen.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
};
