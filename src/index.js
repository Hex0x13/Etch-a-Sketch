"use strict"

const container = document.querySelector('.container');
const sliderInput = document.querySelector('input[type="range"]');
const sliderValue = document.querySelector('.grid-size');
const clearButton = document.querySelector('.clear');
const penButton = document.querySelector('.pen');
const eraserButton = document.querySelector('.erase');
const colorPicker = document.querySelector('#color-picker');
const colorButtons = document.querySelector('.color');
const penColor = document.querySelector('#pen-color');

const thumbWidth = 5;
const MAX_SLIDER_VALUE = +sliderInput.max;
const MIN_SLIDER_VALUE = +sliderInput.min;
const DEFAULT_FILL_COLOR = '#444';
const ERASER_FILL_COLOR = 'white';
const DEFAULT_GRID_SIZE = 16;
const ERASE = false;
const FILL = true;
const colors = {
  'coral': 'coral',
  'limegreen': 'limegreen',
  'turquoise': 'turquoise',
  'lightyellow': '#F8E473'
}

let gridSize = DEFAULT_GRID_SIZE;
let fillMode = FILL;
let fillColor = DEFAULT_FILL_COLOR;
let mouseDown = false;

sliderInput.onmouseup = selectNumberOfGrid;
sliderInput.addEventListener('input', changeSliderTrack);
penButton.onclick = penFill;
eraserButton.onclick = eraseFill;
clearButton.onclick = loadGrid;
colorPicker.onchange = changeFillColor;
document.body.onmousedown = () => { mouseDown = true };
document.body.onmouseup = () => { mouseDown = false };
colorButtons.addEventListener('click', changeFillColor);


function changeSliderTrack() {
  const value = +sliderInput.value;
  const total = MAX_SLIDER_VALUE - MIN_SLIDER_VALUE;
  const average = (value - MIN_SLIDER_VALUE) / total;
  const percentage = average * 100;
  sliderValue.textContent = `${value} x ${value}`;
  sliderInput.style.backgroundImage =
    `linear-gradient(to right,
    lightseagreen ${percentage}%, 
    transparent ${percentage}%, 
    transparent)`;
}

function selectNumberOfGrid(event) {
  gridSize = sliderInput.value;
  if (gridSize >= MIN_SLIDER_VALUE && gridSize <= MAX_SLIDER_VALUE) {
    loadGrid();
  }
}

function changeFill(event) {
  if (mouseDown || event.type === 'mousedown')
    this.style.backgroundColor = fillColor;
}

function penFill() {
  fillMode = FILL;
  fillColor = DEFAULT_FILL_COLOR;
  penColor.textContent = fillColor;
  penColor.style.backgroundColor = fillColor;
}

function eraseFill() {
  fillMode = ERASE;
  fillColor = ERASER_FILL_COLOR;
  penColor.textContent = eraserButton.textContent;
  penColor.style.backgroundColor = fillColor;
}

function changeFillColor(event) {
  const pickcolor = fillColor = event.srcElement.classList[1];
  if (pickcolor in colors) {
    fillMode = FILL;
    fillColor = colors[pickcolor];
    penColor.textContent = fillColor;
    penColor.style.backgroundColor = fillColor;
  } else if (pickcolor !== colorButtons.classList[1]) {
    fillMode = FILL;
    fillColor = colorPicker.value;
    penColor.textContent = fillColor;
    penColor.style.backgroundColor = fillColor;
  }
}


function loadGrid() {
  container.innerHTML = '';
  for (let i = 0; i < gridSize; i++) {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    for (let j = 0; j < gridSize; j++) {
      const columnDiv = document.createElement('div');
      columnDiv.classList.add('column');
      columnDiv.addEventListener('mousedown', changeFill);
      columnDiv.addEventListener('mouseover', changeFill);
      rowDiv.appendChild(columnDiv);
    }

    container.appendChild(rowDiv);
  }
}


window.onload = () => {
  sliderInput.value = DEFAULT_GRID_SIZE;
  changeSliderTrack();
  loadGrid();
};
