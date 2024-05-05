// bouton pour mélanger les cartes et réinitialiser le jeu
export default function Button({shuffleCards}) {
    return (
        <button onClick={shuffleCards}>New game</button>
    )
}