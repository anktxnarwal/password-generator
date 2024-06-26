const inputSlider = document.querySelector("#passwordRange");
const lengthDisplay = document.querySelector("#lenDisplay");
const displayPassword = document.getElementById("dispPassword");
const upperCheck = document.querySelector("#uppercase"); 
const lowerCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const generateBtn = document.querySelector("#generateBtn");
let password = "";
let passwordLength = 10;
let checkCount = 0;
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

function Slider() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;
}

inputSlider.addEventListener("input", (e) => {
  passwordLength = e.target.value;
  Slider();
});

function randInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randNumber() {
  return randInteger(0, 10); 
}

function randUpperCase() {
  return String.fromCharCode(randInteger(65, 91));
}

function randLowerCase() {
  return String.fromCharCode(randInteger(97, 123));
}

function randSymbol() {
  const randNum = randInteger(0, symbols.length);
  return symbols.charAt(randNum);
}

function handleCheckBoxChange() {
  checkCount = 0;
  allCheckBox.forEach((checkbox) => {
    if (checkbox.checked) checkCount++;
  });

  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    Slider();
  }
}

function shufflePassword(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  let str = "";
  array.forEach((el) => (str += el));
  return str;
}

allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckBoxChange);
});

generateBtn.addEventListener("click", () => {
  if (checkCount === 0) return;
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    Slider();
  }

  password = "";
  let funArr = [];
  if (upperCheck.checked) {
    funArr.push(randUpperCase);
  }
  if (lowerCheck.checked) {
    funArr.push(randLowerCase);
  }
  if (numberCheck.checked) {
    funArr.push(randNumber);
  }
  if (symbolCheck.checked) {
    funArr.push(randSymbol);
  }

  for (let i = 0; i < funArr.length; i++) {
    password += funArr[i]();
  }

  for (let i = 0; i < passwordLength - funArr.length; i++) {
    let randIndex = randInteger(0, funArr.length);
    password += funArr[randIndex]();
  }

  password = shufflePassword(Array.from(password));
  displayPassword.value = password;
});
