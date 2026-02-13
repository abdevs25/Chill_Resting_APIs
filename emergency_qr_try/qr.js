const uniqueId = crypto.randomUUID().slice(0, 8);
localStorage.setItem("emergencyId", uniqueId);

const emergencyURL = `${window.location.origin}/emergency.html?id=${uniqueId}`;

QRCode.toDataURL(emergencyURL, { width: 300 }, function (err, url) {
  localStorage.setItem("qrImage", url);
});
