const $ = (id) => document.querySelector(id); //función para obtener selector

//obtengo los elementos que cambiarán
const input = $(".fake-textarea");
input.focus(); //pongo el foco en el input
const spanSign = $(".span-sign");
const spanRules = $(".span-rules");
const showResult = $(".show-result");
const showResultText = $(".show-result > p");

//obtengo los botones
const btnEncrypt = $(".btn-encrypt");
const btnDecrypt = $(".btn-decrypt");
const btnCopy = $("#btn-copy");

//variables
let stringResult = "";
let chartInvalid = false;

function validateString() {
  if (chartInvalid) {
    spanRules.innerText = "Ingrese un texto válido";
    spanRules.style.color = "#FF0000";
    spanSign.style.background = "#FF0000";
    setTimeout(() => {
      spanRules.innerText = "Solo letras minúsculas y sin acentos";
      spanRules.style.color = "#495057";
      spanSign.style.background = "#343a40";
    }, 5000);
    chartInvalid = false;
    return true;
  }
}

function processString(inputString, type) {
  //creo un array con array adentro que contiene el caracter a buscar y el valor con el que será reemplazado
  let arrayKeys = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"],
  ];
  if (type == "decrypt") {
    //si el tipo de proceso es desencriptar, le doy reversa a los valores
    for (let i = 0; i < arrayKeys.length; i++) {
      const element = arrayKeys[i];
      arrayKeys[i] = element.reverse();
    }
  }

  //expresión regular para validar si hay mayusculas y acentos
  const REGEX = /^[a-z\u0021-\u003F\s]+$/;

  if (!REGEX.test(inputString)) {
    chartInvalid = true;
  }

  if (validateString()) return;

  //reemplazo los caracteres según corresponda el tipo de proceso
  for (let i = 0; i < arrayKeys.length; i++) {
    if (inputString.includes(arrayKeys[i][0])) {
      inputString = inputString.replaceAll(arrayKeys[i][0], arrayKeys[i][1]);
    }
  }
  stringResult = inputString;
}

//función para limpiar el input y mostrar el resultado
function clearAndShowResult(inputString) {
  input.innerText = ""; //limpio
  input.focus(); //pongo el foco
  if (inputString.length > 0 && stringResult.length > 0) {
    showResult.setAttribute("isEmpty", "false");
    showResultText.innerText = stringResult;
  }
}

btnEncrypt.addEventListener("click", () => {
  const inputString = input.innerText.trim();
  processString(inputString, "encrypt");
  clearAndShowResult(inputString);
});

btnDecrypt.addEventListener("click", () => {
  const inputString = input.innerText.trim();
  processString(inputString, "decrypt");
  clearAndShowResult(inputString);
});

btnCopy.addEventListener("click", () => {
  btnCopy.classList.add("btn-copy-clicked");
  btnCopy.innerText = "¡Copiado!";
  navigator.clipboard.writeText(stringResult);
  setTimeout(() => {
    btnCopy.classList.remove("btn-copy-clicked");
    btnCopy.innerText = "Copiar";
  }, 1000);
});
