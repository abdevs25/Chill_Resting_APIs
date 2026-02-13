const sendBtn = document.getElementById("sendBtn");
const status = document.getElementById("status");

sendBtn.addEventListener("click", () => {
  const data = JSON.parse(localStorage.getItem("emergencyData"));

  if (!data || !data.contactNumber) {
    alert("Emergency contact not found. Please set it up first.");
    return;
  }

  if (!navigator.geolocation) {
    alert("Geolocation is not supported by this browser.");
    return;
  }

  status.textContent = "Getting your current location…";

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      const mapLink = `https://maps.google.com/?q=${lat},${lon}`;

      const message = `
EMERGENCY 🚨
This is my current location.
Please reach out to me immediately.

📍 ${mapLink}
`.trim();

      const phone = data.contactNumber.replace(/\D/g, "");

      const whatsappURL =
        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

      status.textContent = "Opening WhatsApp…";

      window.open(whatsappURL, "_blank");
    },
    () => {
      status.textContent = "Unable to retrieve location.";
    }
  );
});
