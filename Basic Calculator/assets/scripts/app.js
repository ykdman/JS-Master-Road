const defaultResult = 0;
let currentResult = defaultResult; //전역

// let logEntries = []; // perform 누적

// /** Get Random UUID */
// function getRandomUUID() {
//   return crypto.randomUUID();
// }

// /** generate Perfomance Object From Buttons */
// function generateBtnPerfomOnject(performUUID, operator, inputNumber, prevResult, currentResult) {
//   return {
//     uuid: performUUID,
//     operator: operator,
//     number: inputNumber,
//     prevResult: prevResult,
//     result: currentResult,
//   };
// }

// /** perform Object push to logEntries */
// function stackLogEntry(operator, enteredNumber, lastResult, currentResult) {
//   const performUUID = getRandomUUID();
//   const perfomObject = generateBtnPerfomOnject(performUUID, operator, enteredNumber, lastResult, currentResult);
//   logEntries.push(perfomObject);
//   for (let i = 0; i <= logEntries.length; i++) {
//     if (logEntries[i].uuid === performUUID) {
//       return `${logEntries[i].prevResult} '${logEntries[i].operator}' ${logEntries[i].number} = ${logEntries[i].result}`;
//     }
//   }
// }

/**Get Uset Input To Number Type*/
function getUserNumerInput() {
  return parseInt(userInput.value);
}

/**Generates and Write Calculation Log */
function createCalcTextAndWrite(operator, beforeCalcNumber, afterCalcNumber) {
  // operator = 연산자 (string)
  const calculationDescription = `${beforeCalcNumber} ${operator} ${afterCalcNumber}`;
  outputResult(currentResult, calculationDescription); // from vendor.js
}

function calculateResult(calculationType) {
  if (calculationType !== 'ADD' && calculationType !== 'SUBTRACT' && calculationType !== 'DIVIDE' && calculationType !== 'MULTIPLY') {
    return;
  } else {
    const enteredNumber = getUserNumerInput();
    const lastResult = currentResult;
    let mathOperator;
    if (calculationType === 'ADD') {
      currentResult = currentResult + enteredNumber;
      mathOperator = '+';
    } else if (calculationType === 'SUBTRACT') {
      currentResult = currentResult - enteredNumber;
      mathOperator = '-';
    } else if (calculationType === 'DIVIDE') {
      currentResult = currentResult / enteredNumber;
      mathOperator = '/';
    } else {
      currentResult = currentResult * enteredNumber;
      mathOperator = '*';
    }

    createCalcTextAndWrite(mathOperator, lastResult, enteredNumber);

    stackLogEntry(calculationType, enteredNumber, lastResult, currentResult); //perfomance.js
  }
}

function add() {
  calculateResult('ADD');
}

function subtract() {
  calculateResult('SUBTRACT');
}

function multiply() {
  calculateResult('MULTIPLY');
}

function divide() {
  calculateResult('DIVIDE');
}

addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
multiplyBtn.addEventListener('click', multiply);
divideBtn.addEventListener('click', divide);
