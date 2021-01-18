import { showModal } from './modal';
import { createFighterImage } from '../fighterPreview';


export function showWinnerModal(fighter) {
    const winnerImageElement = createFighterImage(fighter);
    const winnerData = {
        title: fighter.name,
        bodyElement: winnerImageElement,
    }
    showModal(winnerData);
}
