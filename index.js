const $ = (id) => document.querySelector(id); // function to get selector

// get the items to change
const input = $(".fake-textarea");
input.focus(); // put the focus on the input as soon as the page loads
const spanSign = $(".span-sign");
const spanRules = $(".span-rules");
const showResult = $(".show-result");
const showResultText = $(".show-result > p");
const inputAttribute = showResult.getAttribute("isEmpty"); // get the value of the isEmpty attribute

// get the buttons from the html
const btnEncrypt = $(".btn-encrypt");
const btnDecrypt = $(".btn-decrypt");
const btnCopy = $("#btn-copy");

// variables
let stringResult = ""; // stores the result
let chartInvalid = false; // boolean to validate if there is an invalid character

function validateString() {
  if (chartInvalid) {
    // apply the styles for the alert
    spanRules.innerText = "Ingrese un texto válido";
    spanRules.style.color = "#FF0000";
    spanSign.style.background = "#FF0000";

    setTimeout(() => {
      // return alert styles to normal
      spanRules.innerText = "Solo letras minúsculas y sin acentos";
      spanRules.style.color = "#495057";
      spanSign.style.background = "#343a40";
    }, 3000);

    chartInvalid = false;
    return true;
  }
}

function processString(inputString, type) {
  // array with arrays inside containing the character to search for and the value to be replaced with
  let arrayKeys = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"],
  ];
  if (type == "decrypt") {
    // if the process type is decrypt, reverse the values
    for (let i = 0; i < arrayKeys.length; i++) {
      const element = arrayKeys[i];
      arrayKeys[i] = element.reverse();
    }
  }

  // regular expression to check if there are capital letters and accents
  const REGEX = /^[a-z\u0021-\u003F\s]+$/;

  if (!REGEX.test(inputString)) {
    chartInvalid = true;
  }

  if (validateString()) return;

  // replaces the characters according to the type of process
  for (let i = 0; i < arrayKeys.length; i++) {
    if (inputString.includes(arrayKeys[i][0])) {
      inputString = inputString.replaceAll(arrayKeys[i][0], arrayKeys[i][1]);
    }
  }

  stringResult = inputString;
}

// function to clear the input and display the result
function clearAndShowResult(inputString) {
  showResultText.style.animation = ""; // clears the animation every time it shows a new text
  input.innerText = ""; //clean
  input.focus(); //put the focus
  if (inputString.length > 0 && stringResult.length > 0) {
    // validate that the attribute is true
    inputAttribute == "true" && showResult.setAttribute("isEmpty", "false");

    showResultText.innerText = stringResult;
    // put the animation every time there is new text
    showResultText.style.animation = "fade-in 1s ease-in-out forwards";
  }
}

// event to do the encrypt process
btnEncrypt.addEventListener("click", () => {
  const inputString = input.innerText.trim();
  processString(inputString, "encrypt");
  clearAndShowResult(inputString);
});

// event to do the decrypt process
btnDecrypt.addEventListener("click", () => {
  const inputString = input.innerText.trim();
  processString(inputString, "decrypt");
  clearAndShowResult(inputString);
});

// event to copy the message
btnCopy.addEventListener("click", () => {
  btnCopy.classList.add("btn-copy-clicked");
  btnCopy.innerText = "¡Copiado!";
  navigator.clipboard.writeText(stringResult);
  setTimeout(() => {
    btnCopy.classList.remove("btn-copy-clicked");
    btnCopy.innerText = "Copiar";
  }, 1000);
});

// event to put the plain text in case a text with another format is going to be pasted
input.addEventListener("paste", function (e) {
  e.preventDefault(); // Avoid the default paste action

  // Gets the plain text from the clipboard
  var text = (e.originalEvent || e).clipboardData.getData("text/plain");

  // Insert the plain text into the div
  this.innerText = text;
});
