// Sets the value of both date inputs to be today by default using Date module
function getDate() {
  todayDateString = new Date().toISOString().slice(0, 10);
  document.getElementById("past-activity-date").value = todayDateString;
  document.getElementById("future-activity-date").value = todayDateString;

}

function updateUnits(inputType) {
  activityType = document.getElementById(inputType + "-activity-type").value;
  if (activityType === "Walk" || activityType === "Run" || activityType === "Bike") {
    unitType = "km";
  } else if (activityType === "Yoga" || activityType === "Soccer" || activityType === "Basketball") {
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
  document.getElementById("past-activity-box-form").style.display = "flex";
}


// Changes the initial display to reveal the form for a future activity
function enterNextActivity() {
  document.getElementById("next-activity-box-button").style.display = "none";
  document.getElementById("recorded-future-activity").style.display = "none";
  document.getElementById("next-activity-box-form").style.display = "flex";
}

// Checks if all of the fields for the form have been filled out correctly before the user is able to submit an activity. InputType is either present or past. 
function validateInput(inputType) {
  // Check that all the fields are filled out
  elementList = [];
  elementList.push(document.getElementById(inputType + "-activity-date").value);
  elementList.push(document.getElementById(inputType + "-activity-type").value);
  if (inputType == "past") {
    elementList.push(document.getElementById(inputType + "-time-distance").value);
    elementList.push(document.getElementById(inputType + "-units").value);
  }
  for (i = 0; i < elementList.length; i++) {
    if (elementList[i].length == 0) {
      console.log(elementList[i]);
      alert("Make sure to fill out all fields of the form!")
      return false;
    }
  }
  // Check that the date is valid 
  todayDateString = new Date().toISOString().slice(0, 10);
  if (inputType == "past") {
    // Check that the date of a past activity is in the past 
    if (elementList[0] > todayDateString) {
      alert("Date must be in the past");
      return false;
    }
  } else {
    // Check that the date of a future activity is in the future 
    if (elementList[0] < todayDateString) {
      alert("Date must be in the future");
      return false;
    }
  }
  // Since everything is valid, move on to updating text and calling the postRequest
  updateText(inputType, elementList);
  sendPostRequest(inputType, elementList).then(function (response) {
    if (inputType == "past") {
      console.log("Past Activity Success:");
    } else {
      console.log("Future Plans Success:")
    } 
    console.log(response);
  }).catch(function (error) {
    console.log("Error", error);
  });
}

// Change the inner text of the div's and then make the div visible
function updateText(inputType, elementList) {
  if (inputType == "past") {
      document.getElementById("past-activity-bold").innerText = elementList[1] + " for " + elementList[2] + " " + elementList[3] + "."
      document.getElementById("past-activity-box-form").style.display = "none";
      document.getElementById("recorded-past-activity").style.display = "flex";
      document.getElementById("recorded-past-activity").style.flexDirection = "column";
  } else {
    document.getElementById("future-activity-bold").innerText = elementList[1] + " on " + elementList[0] + "!";
    document.getElementById("next-activity-box-form").style.display = "none";
    document.getElementById("recorded-future-activity").style.display = "flex";
    document.getElementById("recorded-future-activity").style.flexDirection = "column";
  }
}

// Sends the post request to the server. 
async function sendPostRequest(inputType, elementList) {
  // Print out Console messages
  if (inputType == "past") {
    console.log("Past Activity Sending:");
    url = "/pastActivity";
    jsonObject = {
      "activity": elementList[1],
      "date": elementList[0],
      "scalar": elementList[2],
      "units": elementList[3]
    }
    console.log(jsonObject);
  } else {
    console.log("Future Plans Sending:");
    url = "/futureActivity";
    jsonObject = {
      "activity": elementList[1],
      "date": elementList[0]
    }
    console.log(jsonObject);
  }
  // Send POST request 
  let response = await fetch(url, {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(jsonObject) 
  });
  return response.json();
}
