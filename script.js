
$(document).ready(function () {
  const app = false;

  // get times from moment time package aqde
  const now = moment().format("MMMM Do YYYY");

  let nowHr24 = moment().format("H");
  let nowHr12 = moment().format("h");

  // creating hours after the working time
  if (app) {
    nowHr24 = 13;
    nowHr12 = 1;
  }
  //connecting javaheading for the date to the html navbar id//
  let $dateHeading = $("#navbar-subtitle");
  $dateHeading.text(now);
  //save icon picture for each div of input
  const saveIcon = "./Assets/images/saveicon.png";

  // Get stored to do values from localStorage
  // converting the todo values to a string using the parse method//
  let storedPlans = JSON.parse(localStorage.getItem("storedPlans"));

  if (app) {
    console.log(storedPlans);
  }

  // If plans were retrieved from localStorage, update the plan array to it
  if (storedPlans !== null) {
    planTextArr = storedPlans;
  } else {
    // this should only occur on first time the app is loaded in the browser
    planTextArr = new Array(9);
    planTextArr[3] = "LUNCH TIME";
  }

  if (app) {
    console.log("full array of plned text", planTextArr);
  }

  // set variable referencing planner element
  let $plannerDiv = $("#plannerContainer");
  // clear existing elements
  $plannerDiv.empty();

  if (app) {
    console.log("current time", nowHr12);
  }

  // build calendar by row for fix set of hours
  for (let hour = 9; hour <= 17; hour++) {
    // index for array use offset from hour
    let index = hour - 9;

    // build row components
    let $rowDiv = $("<div>");
    $rowDiv.addClass("row");
    $rowDiv.addClass("plannerRow");
    $rowDiv.attr("hour-index", hour);

    // Start building Time box portion of row
    let $col4time = $("<div>");
    $col4time.addClass("col-md-2");

    // create timeBox element (contains time)
    const $timeBoxSpn = $("<span>");
    // can use this to get value
    $timeBoxSpn.attr("class", "timeBox");

    // format hours for display to show am form less than 12 and pm fro over 12//
    let displayHour = 0;
    let ampm = "";
    if (hour > 12) {
      displayHour = hour - 12;
      ampm = "pm";
    } else {
      displayHour = hour;
      ampm = "am";
    }

    // populate timeBox with time
    $timeBoxSpn.text(`${displayHour} ${ampm}`);

    // insert into col inset into timebox
    $rowDiv.append($col4time);
    $col4time.append($timeBoxSpn);
    // STOP building Time box portion of row

    //build the inpuit part of  code
    // build row components
    let $dailyPlanSpn = $("<input>");

    $dailyPlanSpn.attr("id", `input-${index}`);
    $dailyPlanSpn.attr("hour-index", index);
    $dailyPlanSpn.attr("type", "text");
    $dailyPlanSpn.attr("class", "dailyPlan");

    // access index from data array for hour
    $dailyPlanSpn.val(planTextArr[index]);

    // create col to control width
    let $col9IptDiv = $("<div>");
    $col9IptDiv.addClass("col-md-9");

    // add col width and row component to row
    $rowDiv.append($col9IptDiv);
    $col9IptDiv.append($dailyPlanSpn);
    // STOP building Time box portion of row

    // build the save part 
    let $col1SaveDiv = $("<div>");
    $col1SaveDiv.addClass("col-md-1");

    let $saveBtn = $("<i>");
    $saveBtn.attr("id", `saveid-${index}`);
    $saveBtn.attr("save-id", index);
    $saveBtn.attr("class", "far fa-save saveIcon");

    // add col width and row component to row
    $rowDiv.append($col1SaveDiv);
    $col1SaveDiv.append($saveBtn);
    // STOP building save portion of row

    // set row color based on time
    updateRowColor($rowDiv, hour);

    // add row to planner container
    $plannerDiv.append($rowDiv);
  }

  // function to update row color
  function updateRowColor($hourRow, hour) {
    if (app) {
      console.log("rowColor ", nowHr24, hour);
    }

    if (hour < nowHr24) {
      // $hourRow.css('')
      if (app) {
        console.log("lessThan");
      }
      $hourRow.css("background-color", "white");
    } else if (hour > nowHr24) {
      if (app) {
        console.log("greaterthan");
      }
      $hourRow.css("background-color", "purple");
    } else {
      if (app) {
        console.log("equal");
      }
      $hourRow.css("background-color", "palevioletred");
    }
  }

  // saves to local storage
  // onclick function to listen for user clicks on plan area
  $(document).on("click", "i", function (event) {
    event.preventDefault();

    // if (app) {
    //   console.log("click pta before " + planTextArr);
    // }

    let $index = $(this).attr("save-id");

    let inputId = "#input-" + $index;
    let $value = $(inputId).val();

    planTextArr[$index] = $value;

    if (app) {
      console.log("value ", $value);
    }
    if (app) {
      console.log("index ", $index);
    }
    if (app) {
      console.log("click pta after " + planTextArr);
    }

    // remove shawdow pulse class
    // $(`#saveid-${$index}`).removeClass("shadowPulse");
    localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
  });

  // function to color save button on change of input
  $(document).on("change", "input", function (event) {
    event.preventDefault();
    if (app) {
      console.log("onChange");
    }
    if (app) {
      console.log("id", $(this).attr("hour-index"));
    }

    // neeed to check for save button

    let i = $(this).attr("hour-index");

    // // add shawdow pulse class
    // $(`#saveid-${i}`).addClass("shadowPulse");
  });
});
