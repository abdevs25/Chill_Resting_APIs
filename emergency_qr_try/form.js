document.getElementById("emergencyForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    blood: document.getElementById("blood").value,
    contactName: document.getElementById("contactName").value,
    contactNumber: document.getElementById("contactNumber").value,
    allergies: document.getElementById("allergies").value
  };

  localStorage.setItem("emergencyData", JSON.stringify(data));

  const file = document.getElementById("wallpaper").files[0];
  const reader = new FileReader();

  reader.onload = function () {
    localStorage.setItem("wallpaperImage", reader.result);
    window.location.href = "preview.html";
  };

  reader.readAsDataURL(file);
});
