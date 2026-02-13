document.getElementById("emergencyForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const nameInput = document.getElementById("name");
  const bloodInput = document.getElementById("blood");
  const contactNameInput = document.getElementById("contactName");
  const contactNumberInput = document.getElementById("contactNumber");
  const allergiesInput = document.getElementById("allergies");
  const wallpaperInput = document.getElementById("wallpaper");

  if (!wallpaperInput.files.length) {
    alert("Please upload a wallpaper image");
    return;
  }

  const data = {
    name: nameInput.value.trim(),
    blood: bloodInput.value.trim(),
    contactName: contactNameInput.value.trim(),
    contactNumber: contactNumberInput.value.trim(),
    allergies: allergiesInput.value.trim()
  };

  localStorage.setItem("emergencyData", JSON.stringify(data));

  const reader = new FileReader();
  reader.onload = () => {
    localStorage.setItem("wallpaperImage", reader.result);
    window.location.href = "preview.html"; // ✅ THIS WILL WORK
  };

  reader.readAsDataURL(wallpaperInput.files[0]);
});
