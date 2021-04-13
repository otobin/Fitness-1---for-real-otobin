// TODO:
// Add date checking: if future activity, date should be in the future and if
// is a past activity the date should have already occurred
// Set the default values of both date types to be today

function updateUnits(inputType) {
  activityType = document.getElementById(inputType + "-activity-type").value;
  if (activityType === "walk" || activityType === "run" || activityType === "bike") {
    unitType = "km";
  } else if (activityType === "yoga" || activityType === "soccer" || activityType === "basketball") {
    unitType = "min";
  } else {
    unitType = "laps";
  }
  document.getElementById(inputType + "-units").value = unitType;
}

// Changes the initial display to reveal the form for a past activity
function enterPastActivity() {
  document.getElementById("past-activity-box-button").style.display = "none";
  document.getElementById("recorded-past-activity").style.display = "none";
  document.getElementById("past-activity-box-form").style.display = "block";
}


// Changes the initial display to reveal the form for a future activity
function enterNextActivity() {
  document.getElementById("next-activity-box-button").style.display = "none";
  document.getElementById("recorded-future-activity").style.display = "none";
  document.getElementById("next-activity-box-form").style.display = "block";
}

// Checks if all of the fields for the form have been filled out correctly before the user is able to submit an activity. InputType is either present or past. 
function validateInput(inputType) {
  elementList = [];
  elementList.push(document.getElementById(inputType + "-activity-date").value);
  elementList.push(document.getElementById(inputType + "-activity-type").value);
  if (inputType == "past") {
    elementList.push(document.getElementById(inputType + "-time-distance").value);
    elementList.push(document.getElementById(inputType + "-units").value);
  }
  console.log(elementList);
  for (i = 0; i < elementList.length; i++) {
    if (elementList[i].length == 0) {
      console.log(elementList[i]);
      alert("Make sure to fill out all fields of the form!")
      return false;
    }
  }
  updateText(inputType, elementList);
}

// Change the inner text of the div's and then make the div visible
function updateText(inputType, elementList) {
  if (inputType == "past") {
      document.getElementById("recorded-past-activity-text").innerText = "Got it! " + elementList[1] + " for " + elementList[2] + " " + elementList[3] + ". Keep up the good work!"
      document.getElementById("past-activity-box-form").style.display = "none";
      document.getElementById("recorded-past-activity").style.display = "block";
  } else {
    document.getElementById("recorded-future-activity-text").innerText = "Sounds good! Don't forget to update your session for " + elementList[1] + " on " + elementList[0] + "!";
    document.getElementById("next-activity-box-form").style.display = "none";
    document.getElementById("recorded-future-activity").style.display = "block";
  }
}
