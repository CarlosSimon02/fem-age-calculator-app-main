let form = document.getElementById("form");
let day = document.getElementById("day");
let month = document.getElementById("month");
let year = document.getElementById("year");
let dayError = document.getElementById("dayError");
let monthError = document.getElementById("monthError");
let yearError = document.getElementById("yearError");
let numberInputs = document.querySelectorAll('input[type="number"]');
let calculateBtn = document.getElementById("calculateBtn");

const currentYear = new Date().getFullYear();
year.setAttribute('max', currentYear);

function checkForValidity(field, error, msg) {
    document.getElementById("yearResult").innerHTML = "- -";
    document.getElementById("monthResult").innerHTML = "- -";
    document.getElementById("dayResult").innerHTML = "- -";
    document.getElementById("yearH").innerHTML = "years";
    document.getElementById("monthH").innerHTML = "months";
    document.getElementById("dayH").innerHTML = "days";

    for (let i = 0; i < numberInputs.length; i++) {
        if(!(numberInputs.item(i).value === "")) {
            numberInputs.item(i).setCustomValidity("" );
        }
    }
    field.value = field.value.replace(/\D+/g, '');
    field.setCustomValidity("");
    if (field.value >= parseInt(field.getAttribute("min")) && 
        field.value <= parseInt(field.getAttribute("max"))){
        field.setCustomValidity("");
    }
    else error.innerHTML = msg;
}

day.oninput = function(){checkForValidity(day,dayError, "Must be a valid day");};
month.oninput = function(){checkForValidity(month,monthError, "Must be a valid month");};
year.oninput = function(){checkForValidity(year,yearError, "Must be in the past");};

function setMaxDay(e) {
    let timestamp = new Date(year.value+"-"+(parseInt(month.value)+1).toString()+"-"+"1");
    timestamp.setDate(0);

    if (isNaN(timestamp) == false) {
        day.setAttribute('max', timestamp.getDate());
    }
}

year.onchange = setMaxDay();
month.onchange = setMaxDay();

form.onsubmit = function(e) {
    e.preventDefault();

    for (let i = 0; i < numberInputs.length; i++) {
        numberInputs.item(i).setCustomValidity("");
    }

    // check for empty field
    let isError;
    for (let i = 0; i < numberInputs.length; i++) {
        if(numberInputs.item(i).value === "") {
            numberInputs.item(i).setCustomValidity("This field is required");
            isError = true;
            document.querySelectorAll('input[type="number"]+p').item(i).innerHTML = "This field is required";
        }
    }
    if(isError) return;

    // check if date is in the past
    let givenDate = new Date(year.value+"-"+month.value+"-"+day.value);
    let currentDate = new Date();
    givenDate.setHours(0,0,0,0);
    currentDate.setHours(0,0,0,0);
    let diff = currentDate - givenDate;
    if (diff > 0) {
        calculate(diff);
    }
    else {
        for (let i = 0; i < numberInputs.length; i++) {
            numberInputs.item(i).setCustomValidity("Must be in the past");
            document.querySelectorAll('input[type="number"]+p').item(i).innerHTML = "";
        }
        dayError.innerHTML = "Must be in the past";
    }
}

function calculate(age) {
    let yearI = Math.floor(age / 31556926000);
    let monthI = Math.floor((age % 31556926000) / 2629743833.3);
    let dayI = Math.floor(((age % 31556926000) % 2629743833.3) / 86400000);

    animateResult(yearI, document.getElementById("yearResult"),document.getElementById("yearH"), "year");
    animateResult(monthI, document.getElementById("monthResult"),document.getElementById("monthH"), "month");
    animateResult(dayI, document.getElementById("dayResult"),document.getElementById("dayH"), "day");
}

function animateResult(result, span, heading, unit) {
    let iterations = 0;
    const interval = setInterval(() => {
        span.innerHTML = Math.floor(Math.random() * Math.pow(10,result.toString().length)).toString();
        iterations++;
        if(iterations >= 15) {
            clearInterval(interval)
            span.innerHTML = result.toString();
            heading.innerHTML = result === 1 ? unit : unit + "s";
        }
    }, 20);
}