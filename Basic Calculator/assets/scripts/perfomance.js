let logEntries = []; // perform 누적

/** Get Random UUID */
function getRandomUUID() {
  return crypto.randomUUID();
}

/** generate Perfomance Object From Buttons */
function generateBtnPerfomOnject(performUUID, operator, inputNumber, prevResult, currentResult) {
  return {
    uuid: performUUID,
    operator: operator,
    number: inputNumber,
    prevResult: prevResult,
    result: currentResult,
  };
}

/** perform Object push to logEntries */
function stackLogEntry(operator, enteredNumber, lastResult, currentResult) {
  const performUUID = getRandomUUID();
  const perfomObject = generateBtnPerfomOnject(performUUID, operator, enteredNumber, lastResult, currentResult);
  logEntries.push(perfomObject);
  //   for (let i = 0; i <= logEntries.length; i++) {
  //     if (logEntries[i].uuid === performUUID) {
  //       return `${logEntries[i].prevResult} '${logEntries[i].operator}' ${logEntries[i].number} = ${logEntries[i].result}`;
  //     }
  //   }
  // 나중에 연산 속도를 위해 for 문 제거

  console.log(perfomObject);
}
