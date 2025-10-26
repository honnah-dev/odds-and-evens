// STATE
const bank = [];
const odds = [];
const evens = [];

// COMPONENTS

function addNumber(number) {
  if (isNaN(number)) return;
  bank.push(number);
  render();
}

function sort() {
  const number = bank.shift();
  if (number % 2 === 0) {
    evens.push(number);
  } else {
    odds.push(number);
  }
}

function sortOne() {
  sort();
  render();
}

function sortAll() {
  while (bank.length) {
    sort();
  }
  render();
}

function InputLine() {
  const $form = document.createElement("form");
  $form.innerHTML = `
    <label>
      Add a number to the bank
      <input name="number" type="number"/>
    </label>
    <button type="submit" data-action="add">Add number</button>
    <button type="submit" data-action="sortOne">Sort 1</button>
    <button type="submit" data-action="sortAll">Sort All</button>
  `;

  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    const action = event.submitter.dataset.action;

    if (action === "add") {
      const data = new FormData($form);
      const number = data.get("number");
      addNumber(+number);
    } else if (action === "sortOne") {
      sortOne();
    } else if (action === "sortAll") {
      sortAll();
    }
  });

  return $form;
}

/**
 * A single number in a NumberBank
 * @param {number} n
 */
function NumberInBank(n) {
  const $span = document.createElement("span");
  $span.textContent = n;
  return $span;
}

/**
 * A labeled group of Numbers
 * @component
 * @param {string} label
 * @param {number[]} numbers
 */
function NumberBank(label, numbers) {
  const $bank = document.createElement("section");
  $bank.classList.add("bank");
  $bank.innerHTML = `
    <h2>${label}</h2>
    <output></output>
  `;

  const $numbers = numbers.map(NumberInBank);
  $bank.querySelector("output").replaceChildren(...$numbers);

  return $bank;
}

// RENDER
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = "";
  $app.appendChild(InputLine());
  $app.appendChild(NumberBank("Bank", bank));
  $app.appendChild(NumberBank("Odds", odds));
  $app.appendChild(NumberBank("Evens", evens));
}

render();
