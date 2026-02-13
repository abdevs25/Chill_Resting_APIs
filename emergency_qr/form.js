document.getElementById("emergencyForm").addEventListener("submit", (e) => {
  e.preventDefault();

  // ✅ Explicitly fetch inputs
  const nameInput = document.getElementById("name");
  const bloodInput = document.getElementById("blood");
  const contactNameInput = document.getElementById("contactName");
  const contactNumberInput = document.getElementById("contactNumber");
  const allergiesInput = document.getElementById("allergies");
  const wallpaperInput = document.getElementById("wallpaper");

  const data = {
    name: nameInput.value.trim(),
    blood: bloodInput.value.trim(),
    contactName: contactNameInput.value.trim(),
    contactNumber: contactNumberInput.value.trim(),
    allergies: allergiesInput.value.trim()
  };

  // Safety check
  if (!wallpaperInput.files[0]) {
    alert("Please upload a wallpaper image");
    return;
  }

  localStorage.setItem("emergencyData", JSON.stringify(data));

  const reader = new FileReader();
  reader.onload = () => {
    localStorage.setItem("wallpaperImage", reader.result);
    window.location.href = "preview.html"; // ✅ redirect works now
  };

  reader.readAsDataURL(wallpaperInput.files[0]);
});
