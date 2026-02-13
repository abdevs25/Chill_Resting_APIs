document.getElementById("emergencyForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    name: e.target[0].value,
    blood: e.target[1].value,
    contactName: e.target[2].value,
    contactNumber: e.target[3].value,
    allergies: e.target[4].value
  };

  localStorage.setItem("emergencyData", JSON.stringify(data));

  const file = document.getElementById("wallpaperUpload").files[0];
  const reader = new FileReader();

  reader.onload = function () {
    localStorage.setItem("userWallpaper", reader.result);
    window.location.href = "preview.html";
  };

  reader.readAsDataURL(file);
});
