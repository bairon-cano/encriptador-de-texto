const $ = (id) => document.querySelector(id); //function to get a selector

const input = $(".fake-textarea");
const btnEncrypt = $(".btn-encrypt");

//variables
let stringResult = "";

btnEncrypt.addEventListener("click", () => {
  const inputString = input.innerText;
  console.log(inputString);
});
