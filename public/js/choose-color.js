'use strict';

var defaultColor = '#ff0000';
var presetColors = [
  { colorName: 'Red', colorCode: '#ff0000' },
  { colorName: 'Orange', colorCode: '#ffa500' },
  { colorName: 'Yellow', colorCode: '#ffff00' },
  { colorName: 'Green', colorCode: '#008000' },
  { colorName: 'Blue', colorCode: '#0000ff' },
  { colorName: 'Purple', colorCode: '#800080' },
  { colorName: 'Pink', colorCode: '#ff69b4' },
  { colorName: 'Plum', colorCode: '#dda0dd' },
  { colorName: 'White', colorCode: '#ffffff' },
  { colorName: 'Marine', colorCode: '#7fffd4' },
  { colorName: 'Bisque', colorCode: '#ffe4c4' },
  { colorName: 'Violet', colorCode: '#8a2be2' },
  { colorName: 'Magenta', colorCode: '#ff00ff' },
  { colorName: 'Chartreuse', colorCode: '#9eff14' },
  { colorName: 'Chocolate', colorCode: '#d2691e' },
  { colorName: 'Crimson', colorCode: '#dc143c' },
  { colorName: 'Cyan', colorCode: '#00ffff' },
  { colorName: 'Royal', colorCode: '#4169e1' },
  { colorName: 'Mint', colorCode: '#ccffca' },
  { colorName: 'Lime', colorCode: '#00ff00' },
  { colorName: 'Gold', colorCode: '#ffd700' },
  { colorName: 'Sunset', colorCode: '#ff4500' },
  { colorName: 'Teal', colorCode: '#008080' },
  { colorName: 'Olive', colorCode: '#808000' }
];

hsvPicker(defaultColor, presetColors, (colorObj) => {
  console.log(colorObj.HEX);
  socket.emit('color', colorObj.HEX);
});
