// TODO:
// Add date checking: if future activity, date should be in the future and if
// is a past activity the date should have already occurred
// Set the default values of both date types to be today

function updateUnits(inputType) {
  if (inputType === "past") {
    activityType = document.getElementById("past-activity-type").value;
  } else {
    activityType = document.getElementById("future-activity-type").value;
  }
  if (activityType === "walk" || activityType === "run" || activityType === "bike") {
    unitType = "km";
  } else if (activityType === "yoga" || activityType === "soccer" || activityType === "basketball") {
    unitType = "min";
  } else {
    unitType = "laps";
  }
  document.getElementById("units").value = unitType;
}

// Changes the initial display to reveal the form for a past activity
function enterPastActivity() {
  document.getElementById("past-activity-box-button").style.display = "none";
  document.getElementById("past-activity-box-form").style.display = "block";
}


// Changes the initial display to reveal the form for a future activity
function enterNextActivity() {
  document.getElementById("next-activity-box-button").style.display = "none";
  document.getElementById("next-activity-box-form").style.display = "block";
}

// Checks if all of the fields for the form have been filled out correctly before the user is able to submit an activity. InputType is either present or past. 
function validateInput(inputType) {
  elementList = [];
  elementList.push(document.getElementById(inputType + "-activity-date"));
  elementList.push(document.getElementById(inputType + "-activity-type"));
  elementList.push(document.getElementById(inputType + "-time-distance"));
  elementList.push(document.getElementById(inputType + "-units"));
  for (i = 0; i < elementList.length; i++) {
    if (elementList[i].value === "") {
      alert("Make sure to fill out all fields of the form!")
      return False;
    }
  }
  console.log("nice! You filled it out correctly");
}
