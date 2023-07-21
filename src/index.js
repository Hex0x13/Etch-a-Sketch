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
const randomColor = document.querySelector('.rainbow');

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
let fillColor = DEFAULT_FILL_COLOR;
let mouseDown = false;
let randomFill = false;
let touchstart = false;

sliderInput.onmouseup = selectNumberOfGrid;
sliderInput.addEventListener('input', changeSliderTrack);
penButton.onclick = penFill;
randomColor.onclick = randomizeFill;
eraserButton.onclick = eraseFill;
clearButton.onclick = loadGrid;
colorPicker.onchange = changeFillColor;
document.body.onmousedown = () => { mouseDown = true };
document.body.ontouchstart = () => {touchstart = true};
document.body.onmouseup = () => { mouseDown = false };
document.body.ontouchend = () => {touchstart = false};
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
  if ((!mouseDown && event.type !== 'mousedown' )){
    return;
  }
    
  if (!randomFill){
    this.style.backgroundColor = fillColor;
  } else {
    this.style.backgroundColor = getRandomFill();
  }
}

function changeFillinTouch(event){
  if (!touchstart && event.type !== 'touchstart'){
    return;
  }
  const touchX = event.touches[0].clientX;
  const touchY = event.touches[0].clientY;
  const element = document.elementFromPoint(touchX, touchY);
  const column = element.className === 'column';
  
  if (!randomFill && column) {
    element.style.backgroundColor = fillColor;
  } else if (column) {
    element.style.backgroundColor = getRandomFill();
  }
}

function getRandomFill(){
  return `rgb(
    ${Math.random() * 256}, 
    ${Math.random() * 256}, 
    ${Math.random() * 256})`;
}

function penColorChange(color, text, image, randomfill){
  randomFill = randomfill;
  fillColor = color;
  penColor.textContent = text;
  penColor.style.backgroundColor = fillColor;
  penColor.style.backgroundImage = image;
}

function penFill() {
  penColorChange(DEFAULT_FILL_COLOR, DEFAULT_FILL_COLOR, 'none', false);
}

function eraseFill() {
  penColorChange(ERASER_FILL_COLOR, eraserButton.textContent, 'none', false);
}

function changeFillColor(event) {
  const pickcolor = fillColor = event.srcElement.classList[1];
  if (pickcolor in colors) {
    penColorChange(colors[pickcolor], colors[pickcolor], 'none', false);
  } else if (pickcolor !== colorButtons.classList[1]) {
    penColorChange(colorPicker.value, colorPicker.value, 'none', false);
  }
}

function randomizeFill(){
  const backgroundImage =
  "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)";
  penColorChange('black', 'Random', backgroundImage, true);
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
      columnDiv.addEventListener('touchstart', changeFillinTouch);
      columnDiv.addEventListener('touchmove', changeFillinTouch);
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
