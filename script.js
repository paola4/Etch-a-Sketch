// A function that creates 16x16 grid of divs
const container = document.querySelector("#container");
const size = document.querySelector(
  "input[type='radio'][name=size]:checked"
).value;
createGrid(size);
draw();

// A function that creates a grid of divs
function createGrid(size) {
  for (let i = 0; i < size; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    container.appendChild(row);
    for (let j = 0; j < size; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      row.appendChild(cell);
    }
  }
}

// A function that allows the user to draw on the grid
function draw() {
  var isClicked = false;
  const cells = document.querySelectorAll(".cell");
  let selectedColor = "black";

  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const style = getComputedStyle(button);

      // log the type of the color
      selectedColor = rgb2hex(style.backgroundColor);
    });
  });

  window.addEventListener("mousedown", (e) => {
    isClicked = true;
  });

  window.addEventListener("mouseup", (e) => {
    if (isClicked === true) {
      isClicked = false;
    }
  });

  cells.forEach((cell) =>
    cell.addEventListener("mousemove", function () {
      if (isClicked === true) {
        this.style.backgroundColor = selectedColor;
      }
    })
  );
  cells.forEach((cell) =>
    cell.addEventListener("click", function () {
      if (
        this.style.backgroundColor == "" ||
        this.style.backgroundColor == "white"
      ) {
        this.style.backgroundColor = selectedColor;
      } else {
        this.style.backgroundColor = "white";
      }
    })
  );

  // Clear board when user clicks "Reset Board" button
  const resetButton = document.querySelector("#reset");
  resetButton.addEventListener("click", resetBoard);

  // Change the size of the board when user selects a different size
  const radio_buttons = document.querySelectorAll("input[type='radio']");
  radio_buttons.forEach((radio_button) => {
    radio_button.addEventListener("change", function () {
      container.innerHTML = "";
      createGrid(this.value);
      draw();
    });
  });
}

function getColor() {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const style = getComputedStyle(button);

      // log the type of the color
      return rgb2hex(style.backgroundColor);
    });
  });
}

function rgb2hex(rgb) {
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  function hex(x) {
    return ("0" + parseInt(x).toString(16)).slice(-2);
  }
  return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function resetBoard() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => (cell.style.backgroundColor = "white"));
}
