import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });
  
  const fighterImage = createFighterImage(fighter);
  const fighterInfoElement = createElement({
    tagName: 'div',
    className: `fighter-preview___info`,
  });

  fighterInfoElement.innerHTML = `
    <span class="fighter-preview___info-thin">Name</span>: ${fighter.name} <br>
    <span class="fighter-preview___info-thin">Health</span>: ${fighter.health} <br>
    <span class="fighter-preview___info-thin">Attack</span>: ${fighter.attack} <br>
    <span class="fighter-preview___info-thin">Defense</span>: ${fighter.defense} <br>
  `;

  fighterElement.append(fighterImage);
  fighterElement.append(fighterInfoElement);

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
