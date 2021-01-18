import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    firstFighter.healthLeft = firstFighter.health;
    secondFighter.healthLeft = secondFighter.health;    
    let isFirstFighterCanCriticalHit = true;
    let isSecondFighterCanCriticalHit = true;
    let keysPressed = {};

    addActionsListeners();

    function addActionsListeners() {
      document.addEventListener('keydown', (event) => {
        keysPressed[event.code] = true;
        userActionsHandler(event.code);
      });

      document.addEventListener('keyup', (event) => {
        delete keysPressed[event.code];
      });
    }

    function userActionsHandler(key) {
      switch (key) {
        case 'KeyQ':
        case 'KeyW':
        case 'KeyE':
          if (keysPressed.KeyQ && keysPressed.KeyW && keysPressed.KeyE && isFirstFighterCanCriticalHit) {
            updateHealth(secondFighter, firstFighter.attack * 2);
            isFirstFighterCanCriticalHit = false;
            setTimeout(() => { isFirstFighterCanCriticalHit = true }, 10000);
          }
          break;
        case 'KeyU':
        case 'KeyI':
        case 'KeyO':
          if (keysPressed.KeyU && keysPressed.KeyI && keysPressed.KeyO && isSecondFighterCanCriticalHit) {
            updateHealth(firstFighter, secondFighter.attack * 2);
            isSecondFighterCanCriticalHit = false;
            setTimeout(() => { isSecondFighterCanCriticalHit = true }, 10000);
          }
          break;
        case controls.PlayerOneAttack:
          if (keysPressed[controls.PlayerOneBlock]) break;
          if (keysPressed[controls.PlayerTwoBlock]) {
            updateHealth(secondFighter, getDamage(firstFighter, secondFighter));
          } else {
            updateHealth(secondFighter, getHitPower(firstFighter));
          }
          break;
        case controls.PlayerTwoAttack:
          if (keysPressed[controls.PlayerTwoBlock]) break;
          if (keysPressed[controls.PlayerOneBlock]) {
            updateHealth(firstFighter, getDamage(secondFighter, firstFighter));
          } else {
            updateHealth(firstFighter, getHitPower(secondFighter));
          }
          break;
      }
      renderHealth(firstFighter, secondFighter)
    }

    function updateHealth(fighter, damage) {
      fighter.healthLeft -= damage;
      if (firstFighter.healthLeft <= 0) resolve(secondFighter);
      if (secondFighter.healthLeft <= 0) resolve(firstFighter);
    }
  });
}

function renderHealth(firstFighter, secondFighter) {
  const leftHealthBar = document.querySelector('#left-fighter-indicator');
  const rightHealthBar = document.querySelector('#right-fighter-indicator');

  const leftFighterHealthLeft = firstFighter.healthLeft / firstFighter.health * 100;
  const rightFighterHealthLeft = secondFighter.healthLeft / secondFighter.health * 100;

  leftHealthBar.setAttribute("style", `width: ${leftFighterHealthLeft}%`);
  rightHealthBar.setAttribute("style", `width: ${rightFighterHealthLeft}%`);
}

export function getDamage(attacker, defender) {
  const damage = getHitPower(attacker) - getBlockPower(defender);
  return (damage > 0) ? damage : 0;
}

export function getHitPower(fighter) {
  const criticalHitChance = Math.random() + 1;
  const power = fighter.attack * criticalHitChance;
  return power;
}

export function getBlockPower(fighter) {
  const dodgeChance  = Math.random() + 1;
  const power = fighter.defense  * dodgeChance ;
  return power;
}
