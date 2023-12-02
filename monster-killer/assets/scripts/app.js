/** CONSTANT */
const PLAYER_NORMAL_ATTACK_VALUE = 10;
const PLAYER_STRONG_ATTACK_VALUE = 18;
const MONSTER_MAX_ATTACK_VALUE = 12;
const HEAL_VALUE = 20;

let maxHealth = 100;
let currentPlayerHealth = maxHealth;
let currentMonterHealth = maxHealth;
let hasBonusLife = true;

/** Game Reset */
adjustHealthBars(maxHealth);

/** Contoler */
function attackContoler(attackMode) {
  let playerMaxAttackValue;
  if (attackMode.includes('STRONG')) {
    playerMaxAttackValue = PLAYER_STRONG_ATTACK_VALUE;
  } else {
    playerMaxAttackValue = PLAYER_NORMAL_ATTACK_VALUE;
  }

  // PLayer Attack Monster
  const toMonsterDamage = dealMonsterDamage(playerMaxAttackValue);
  currentMonterHealth -= toMonsterDamage;
  roundCheck();
}

function roundCheck() {
  let savePlayerHealth = currentPlayerHealth;

  // Monster Attack Player
  const toPlayerDamage = dealPlayerDamage(MONSTER_MAX_ATTACK_VALUE);
  currentPlayerHealth -= toPlayerDamage;

  // Bonus Life
  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    console.log('Bonus Life Saved You!');
    currentPlayerHealth = savePlayerHealth;
    setPlayerHealth(savePlayerHealth);
    removeBonusLife(); //vendor.js
  }

  if (currentMonterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You Won!');
  } else if (currentPlayerHealth <= 0 && currentMonterHealth > 0) {
    alert('You Lose...');
  } else if (currentPlayerHealth <= 0 && currentMonterHealth <= 0) {
    alert('You Have Draw!');
  }
}

/** Attach Click Action */
function attackHandler() {
  attackContoler('ATTACK');
}

/** Strong Attack Click Action */
function strongAttackHandler() {
  attackContoler('STRONG-ATTACK');
}

/** HEAL Button Click Action */
function healHandler() {
  let activeHealValue;
  if (currentPlayerHealth >= maxHealth - HEAL_VALUE) {
    console.log('You Must Not Heal Over Max Health By YourSelf');
    activeHealValue = maxHealth - HEAL_VALUE;
  } else {
    activeHealValue = HEAL_VALUE;
  }

  healPlayerHealth(activeHealValue);
  currentPlayerHealth += activeHealValue;
  roundCheck();
}

/** Event Listner */
attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healHandler);
