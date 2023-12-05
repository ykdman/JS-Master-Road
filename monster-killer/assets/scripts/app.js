/**
 * CONSTANT
 *
 * @format
 */

const CONSTANT = {
  ATTACK_VALUE: {
    PLAYER_NORMAL_ATTACK_VALUE: 10,
    PLAYER_STRONG_ATTACK_VALUE: 18,
    MONSTER_MAX_ATTACK_VALUE: 12,
  },
  HEAL_VALUE: 20,
  MODE: {
    ATTACK: 'ATTACK',
    STRONG_ATTACK: 'STRONG_ATTACK',
  },
  LOG_EVENT: {
    PLAYER_ATTACK: 'PLAYER ATTACK',
    PLAYER_STRONG_ATTACK: 'PLAYER STRONG ATTACK',
    MONSTER_ATTACK: 'MONSTER ATTACK',
    HEAL: 'HEAL',
    GAME_OVER: 'GAME OVER',
  },
};
Object.freeze(CONSTANT);

let enteredvalue = prompt('Maximum Life For you and monster : ', '100');
let maxHealth = parseInt(enteredvalue);

// assign maxHealth
if (isNaN(maxHealth) || maxHealth <= 0) {
  maxHealth = 100;
}

/** Health */
let currentPlayerHealth = maxHealth;
let currentMonterHealth = maxHealth;
let hasBonusLife = true;

/** Game Reset */
adjustHealthBars(maxHealth);

/** Controller */
function attackConroller(attackMode) {
  let playerMaxAttackValue;
  let logEvent;
  if (attackMode === CONSTANT.MODE.ATTACK) {
    playerMaxAttackValue = CONSTANT.ATTACK_VALUE.PLAYER_NORMAL_ATTACK_VALUE;
    logEvent = CONSTANT.LOG_EVENT.PLAYER_ATTACK;
  } else {
    playerMaxAttackValue = CONSTANT.ATTACK_VALUE.PLAYER_STRONG_ATTACK_VALUE;
    logEvent = CONSTANT.LOG_EVENT.PLAYER_STRONG_ATTACK;
  }

  // PLayer Attack Monster
  const toMonsterDamage = dealMonsterDamage(playerMaxAttackValue);
  currentMonterHealth -= toMonsterDamage;
  writeToLog(logEvent, toMonsterDamage, currentPlayerHealth, currentMonterHealth);

  roundCheck();
}

/** Log Func */
const battleLog = [];

function writeToLog(event, value, playerHealth, monsterHealth) {
  let logEntry;
  logEntry = {
    event: event,
    value: value,
    playerHealth: playerHealth,
    monsterHealth: monsterHealth,
  };
  if (
    logEntry.event === CONSTANT.LOG_EVENT.MONSTER_ATTACK ||
    logEntry.event === CONSTANT.LOG_EVENT.HEAL
  ) {
    logEntry.target = 'PLAYER';
  } else if (logEntry.event === CONSTANT.LOG_EVENT.GAME_OVER) {
    logEntry.target = 'BOTH';
  } else {
    logEntry.target = 'MONSTER';
  }
  battleLog.push(logEntry);
}

function reset() {
  currentPlayerHealth = maxHealth;
  currentMonterHealth = maxHealth;
  resetGame(maxHealth);
}

function roundCheck() {
  let savePlayerHealth = currentPlayerHealth;

  // Monster Attack Player
  const toPlayerDamage = dealPlayerDamage(CONSTANT.ATTACK_VALUE.MONSTER_MAX_ATTACK_VALUE);
  currentPlayerHealth -= toPlayerDamage;
  writeToLog(
    CONSTANT.LOG_EVENT.MONSTER_ATTACK,
    toPlayerDamage,
    currentPlayerHealth,
    currentMonterHealth
  );

  // Bonus Life
  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    console.log('Bonus Life Saved You!');
    currentPlayerHealth = savePlayerHealth;
    setPlayerHealth(savePlayerHealth);
    removeBonusLife(); //vendor.js
  }

  // End Round
  if (currentMonterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You Won!');
    writeToLog(
      CONSTANT.LOG_EVENT.GAME_OVER,
      'PLAYER WON',
      currentPlayerHealth,
      currentMonterHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonterHealth > 0) {
    alert('You Lose...');
    writeToLog(
      CONSTANT.LOG_EVENT.GAME_OVER,
      'PLAYER LOSE',
      currentPlayerHealth,
      currentMonterHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonterHealth <= 0) {
    alert('You Have Draw!');
    writeToLog(CONSTANT.LOG_EVENT.GAME_OVER, 'DRAW', currentPlayerHealth, currentMonterHealth);
  }

  // Reset Game
  if (currentPlayerHealth <= 0 || currentMonterHealth <= 0) {
    reset();
  }
}

/** Attach Click Action */
function attackHandler() {
  // attackContoler(MODE_ATTACK);
  attackConroller(CONSTANT.MODE.ATTACK);
}

/** Strong Attack Click Action */
function strongAttackHandler() {
  // attackContoler(MODE_STRONG_ATTACK);
  attackConroller(CONSTANT.MODE.STRONG_ATTACK);
}

/** HEAL Button Click Action */
function healHandler() {
  let activeHealValue;
  if (currentPlayerHealth >= maxHealth - CONSTANT.HEAL_VALUE) {
    console.log('You Must Not Heal Over Max Health By YourSelf');
    activeHealValue = maxHealth - CONSTANT.HEAL_VALUE;
  } else {
    activeHealValue = CONSTANT.HEAL_VALUE;
  }

  healPlayerHealth(activeHealValue);
  currentPlayerHealth += activeHealValue;
  roundCheck();
}
function printLog() {
  console.log(battleLog);
}

/** Event Listner */
attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healHandler);
logBtn.addEventListener('click', printLog);
