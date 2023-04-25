const $ = (id) => document.querySelector(id); //función para obtener selector

const input = $(".fake-textarea");
const spanRules = $(".span-rules");
const showResult = $(".show-result");
const showResultText = $(".show-result > p");

const btnEncrypt = $(".btn-encrypt");
const btnDecrypt = $(".btn-decrypt");
const btnCopy = $("#btn-copy");

const acentos = ["á", "é", "í", "ó", "ú"];

//variables
let stringResult = "";
let chartInvalid = false;

function validateString() {
  if (chartInvalid) {
    spanRules.innerText = "Ingrese un texto válido";
    spanRules.style.color = "#FF0000";
    setTimeout(() => {
      spanRules.style.color = "#495057";
      spanRules.innerText = "Solo letras minúsculas y sin acentos";
    }, 5000);
    chartInvalid = false;
    return true;
  }
}

function processString(inputString, type) {
  //valido que la cadena no sea vacía
  // if (inputString.length == 0) {
  //   chartInvalid = true;
  //   validateString();
  //   return;
  // }

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
  console.log(inputString);
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
