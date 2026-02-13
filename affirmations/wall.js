const mood = localStorage.getItem("userMood");

console.log("Mood from storage:", mood);

const affirmations = {
  low: [
    "You are doing the best you can.",
    "It’s okay to take things slowly.",
    "You matter."
  ],
  anxious: [
    "You are safe right now.",
    "Take one breath at a time.",
    "This feeling will pass."
  ],
  unmotivated: [
    "Small steps still count.",
    "Starting is enough.",
    "Progress is progress."
  ],
  confident: [
    "You’ve got this.",
    "Trust yourself.",
    "You are capable."
  ],
  calm: [
    "Stay in this peaceful moment.",
    "Everything is okay right now.",
    "You deserve this calm."
  ]
};

const wall = document.getElementById("wall");

if (!wall) {
  alert("Wall container not found");
}

const selectedMood = mood && affirmations[mood] ? mood : "calm";

affirmations[selectedMood].forEach(text => {
  const p = document.createElement("p");
  p.textContent = "🌸 " + text;
  p.style.margin = "10px 0";
  wall.appendChild(p);
});
