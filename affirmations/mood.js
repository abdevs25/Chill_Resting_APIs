document.getElementById("moodForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const feelingEl = document.getElementById("feeling");
  const needEl = document.getElementById("need");

  if (!feelingEl || !needEl) {
    alert("Mood form elements not found");
    return;
  }

  const feeling = feelingEl.value;
  const need = needEl.value;

  let mood = "calm";

  if (feeling === "low") mood = "low";
  if (need === "comfort") mood = "anxious";
  if (need === "motivation") mood = "unmotivated";
  if (need === "confidence") mood = "confident";
  if (need === "calm") mood = "calm";

  console.log("Saving mood:", mood);

  localStorage.setItem("userMood", mood);

  window.location.href = "wall.html";
});

