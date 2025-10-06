// DOM elements
const generateBtn = document.getElementById("generateBtn");
const passwordField = document.getElementById("passwordField");
const copyBtn = document.getElementById("copyBtn");
const copiedMsg = document.getElementById("copiedMsg");
const lengthRange = document.getElementById("lengthRange");
const lengthValue = document.getElementById("lengthValue");

// Event: Generate password
generateBtn.addEventListener("click", () => {
  const length = parseInt(lengthRange.value, 10);
  const password = generatePassword(length);
  passwordField.value = password;
  copiedMsg.classList.add("hidden");
});

//Range
lengthRange.addEventListener("input", () => {
  lengthValue.textContent = lengthRange.value;
});

// Event: Copy to clipboard
copyBtn.addEventListener("click", () => {
  const password = passwordField.value;
  if (!password) return;

  navigator.clipboard.writeText(password).then(() => {
    copiedMsg.classList.remove("hidden");
    setTimeout(() => copiedMsg.classList.add("hidden"), 2000);
  });
});

//Random Character
function getRandomCharacter(string) {
  return string[Math.floor(Math.random() * string.length)];
}

//Shuffle the characters
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // swap
  }
  return array;
}

function generatePassword(length = 18) {
  const characters = {
    lower: "abcdefghijklmnopqrstuvwxyz",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*()-_=+[]{}|;:,.<>?",
  };

  const allCharacters =
    characters.lower +
    characters.upper +
    characters.numbers +
    characters.symbols;

  const mustInclude = [
    getRandomCharacter(characters.lower),
    getRandomCharacter(characters.upper),
    getRandomCharacter(characters.numbers),
    getRandomCharacter(characters.symbols),
  ];

  const remainingPass = Math.max(length, 15) - mustInclude.length;
  const randomCharacteres = Array.from({ length: remainingPass }, () =>
    getRandomCharacter(allCharacters)
  );

  const finalPassword = shuffle([...mustInclude, ...randomCharacteres]).join(
    ""
  );
  return finalPassword;
}
