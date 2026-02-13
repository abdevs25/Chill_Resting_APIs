document.getElementById("emergencyForm").onsubmit = (e) => {
  e.preventDefault();

  const data = {
    name: e.target[0].value,
    blood: e.target[1].value,
    contactName: e.target[2].value,
    contactNumber: e.target[3].value,
    allergies: e.target[4].value
  };

  localStorage.setItem("emergencyData", JSON.stringify(data));
  window.location.href = "preview.html";
};
