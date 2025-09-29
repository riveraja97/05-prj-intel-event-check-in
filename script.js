// Maximum allowed attendees
const MAX_ATTENDEES = 50;

// Track attendees and teams
let attendees = [];
let teamCounts = { water: 0, zero: 0, power: 0 };

// DOM elements
const checkInForm = document.getElementById("checkInForm");
const attendeeNameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const attendeeCountDisplay = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const greeting = document.getElementById("greeting");
const waterCountEl = document.getElementById("waterCount");
const zeroCountEl = document.getElementById("zeroCount");
const powerCountEl = document.getElementById("powerCount");

// Load saved data from localStorage
if (localStorage.getItem("attendees")) {
  attendees = JSON.parse(localStorage.getItem("attendees"));
}
if (localStorage.getItem("teamCounts")) {
  teamCounts = JSON.parse(localStorage.getItem("teamCounts"));
}

// Update UI with saved data
attendeeCountDisplay.textContent = attendees.length;
waterCountEl.textContent = teamCounts.water;
zeroCountEl.textContent = teamCounts.zero;
powerCountEl.textContent = teamCounts.power;
const percent = (attendees.length / MAX_ATTENDEES) * 100;
progressBar.style.width = `${percent}%`;

// Helper to get team display name
function teamDisplayName(team) {
  if (team === "water") return "🌊 Team Water Wise";
  if (team === "zero") return "🌿 Team Net Zero";
  if (team === "power") return "⚡ Team Renewables";
  return "Unknown Team";
}

// Handle check-in
checkInForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = attendeeNameInput.value.trim();
  const team = teamSelect.value;

  if (!name || !team) return;

  // Prevent duplicate check-ins
  if (attendees.includes(name.toLowerCase())) {
    greeting.textContent = `⚠️ ${name} has already checked in!`;
    greeting.style.color = "#dc2626";
    greeting.style.display = "block";
    return;
  }

  // Add attendee
  attendees.push(name.toLowerCase());
  teamCounts[team] += 1;
  // Save to localStorage
  localStorage.setItem("attendees", JSON.stringify(attendees));
  localStorage.setItem("teamCounts", JSON.stringify(teamCounts));

  // Update greeting
  greeting.textContent = `✅ Welcome, ${name}! You checked in for ${teamDisplayName(
    team
  )}.`;
  greeting.style.color = "#16a34a";
  greeting.style.display = "block";

  // Update team counts
  waterCountEl.textContent = teamCounts.water;
  zeroCountEl.textContent = teamCounts.zero;
  powerCountEl.textContent = teamCounts.power;

  // Update attendee count
  attendeeCountDisplay.textContent = attendees.length;

  // Update progress bar
  const percent = (attendees.length / MAX_ATTENDEES) * 100;
  progressBar.style.width = `${percent}%`;

  // Reset form
  attendeeNameInput.value = "";
  teamSelect.value = "";
});
