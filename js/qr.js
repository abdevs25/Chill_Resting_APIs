const uniqueId = crypto.randomUUID().slice(0, 8);
localStorage.setItem("emergencyId", uniqueId);

const emergencyURL = `emergency.html?id=${uniqueId}`;

QRCode.toDataURL(emergencyURL, { width: 300 }, (err, url) => {
  localStorage.setItem("qrImage", url);
});
