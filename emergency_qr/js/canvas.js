const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1080;
canvas.height = 1920;

// Load stored data
const wallpaperSrc = localStorage.getItem("userWallpaper");
const emergencyData = JSON.parse(localStorage.getItem("emergencyData"));

// Generate unique ID
const emergencyId = crypto.randomUUID().slice(0, 8);
const emergencyURL = `${window.location.origin}/emergency.html?id=${emergencyId}`;

// Store data for emergency page (demo purpose)
localStorage.setItem("emergencyData_" + emergencyId, JSON.stringify(emergencyData));

// Create image objects
const bgImg = new Image();
const qrImg = new Image();

// 1️⃣ Load wallpaper
bgImg.src = wallpaperSrc;

// 2️⃣ Generate QR → then draw everything
QRCode.toDataURL(emergencyURL, { width: 300 }, (err, qrDataUrl) => {
  if (err) {
    alert("QR generation failed");
    return;
  }

  qrImg.src = qrDataUrl;

  // Wait for BOTH images
  bgImg.onload = () => {
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

    qrImg.onload = () => {
      // Draw QR ON TOP of wallpaper
      ctx.drawImage(qrImg, 390, 1250, 300, 300);

      // Optional label
      ctx.font = "36px Arial";
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.fillText("Scan for Emergency Info", 540, 1200);
    };
  };
});

// Download
document.getElementById("downloadBtn").onclick = () => {
  const link = document.createElement("a");
  link.download = "emergency-lockscreen.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
};
