/**
 * Function to extract function names from a JavaScript file
 * @license see LICENSE file included in the project
 * @author Calidy.com, Amir Moradi (https://calidy.com/)
 * @description see README.md file included in the project
 * @param {string} file Path to the JavaScript file
 */
const fs = require('fs');
const path = require('path');

function getFunctionNames(file) {
  const data = fs.readFileSync(file, 'utf8');

  // Match "function functionName" or "functionName = function" or "functionName: function"
  // This doesn't cover all possible ways to define functions in JavaScript, but should work for most cases
  const functionPattern = /function\s+([a-zA-Z_$][0-9a-zA-Z_$]*)|\s*([a-zA-Z_$][0-9a-zA-Z_$]*)\s*[:=]\s*function/g;
  const functions = new Set(); // Using Set to avoid duplicates

  let match;
  while ((match = functionPattern.exec(data)) !== null) {
    const functionName = match[1] || match[2]; // Function name could be in either group
    functions.add(functionName);
  }

  return Array.from(functions); // Convert Set to Array
}

const filePath = path.join(__dirname, './fourmilab-calendars/calendar.js');
const functionNames = getFunctionNames(filePath);

console.log(functionNames.sort());