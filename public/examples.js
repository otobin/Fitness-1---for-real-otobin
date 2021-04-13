// Add date checking: if future activity, date should be in the future and if
// is a past activity the date should have already occurred 

function updateUnits() {
  activityType = document.getElementById("future-activity-type").value;
  if (activityType === "walk" || activityType === "run" || activityType === "bike") {
    unitType = "km";
  } else if (activityType === "yoga" || activityType === "soccer" || activityType === "basketball") {
    unitType = "min";
  } else {
    unitType = "laps";
  }
  document.getElementById("units").value = unitType;
}

function addPastActivity() {
  console.log("Adding past activity");
}

function addNextActivity() {
  console.log("Adding future activity");
  document.getElementById("next-activity-box-button").style.display = "none";
  document.getElementById("next-activity-box-form").style.display = "block";
  console.log("changed display");
}