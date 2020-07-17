var input = document.getElementById("text-input");
var submitb = document.getElementById("submit");
var pname = document.getElementById("name");
var ptemp = document.getElementById("temp");
var pdesc = document.getElementById("description");
var push = document.querySelector(".cd");
var push2 = document.querySelector(".cd2");
var x = parseInt(1);

input.addEventListener("keyup", (event) => {
  if (event.keyCode == 13) {
    submitb.click();
  }
});

function autocompletes() {
  var autocomplete = new google.maps.places.Autocomplete(input);
}

submitb.addEventListener("click", Info);

async function api() {
  let response = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      input.value +
      "&appid=24a378814964ff5a443bd3fd609a3e0c"
  );
  if (response.ok) {
    return response.json();
  } else {
    alert("WRONG CITY NAME!!!!");
  }
}

function Info() {
  if (input.value == "") {
    return;
  }

  api().then((data) => {
    console.log(data);
    let nameValue = data.name;
    let tempValue = data["main"]["temp"];
    let descValue = data["weather"][0]["description"];
    let icon = data["weather"][0]["icon"];
    let id = data["weather"][0]["id"];

    let convertToCelsius = tempValue - 273;
    let celsius = convertToCelsius.toFixed(2);
    let convertToFarenheit = convertToCelsius * (9 / 5) + 32;
    let farenheit = convertToFarenheit.toFixed(2);

    pname.innerHTML = nameValue;
    ptemp.innerHTML = celsius + "<p>°C / </p>" + farenheit + "<p>°F</p>";
    pdesc.innerHTML = descValue + "<p> /  </p>";
    //   push.classList.toggle("push");
    //   push2.classList.toggle("push2");

    let locationIcon = document.querySelector(".weather-icon");
    let image = document.querySelector("#image");
    image.src = "Icons2/" + icon + ".png";

    if (x === 1) {
      image.classList.toggle("image");
      x++;
    }
  });

  input.value = "";
  input.focus();
}

// document.body.style.webkitTransform =  'scale(1)';
// document.body.style.msTransform =   'scale(100)';
// document.body.style.transform = 'scale(1)';
// document.body.style.zoom = screen.logicalXDPI / screen.deviceXDPI;