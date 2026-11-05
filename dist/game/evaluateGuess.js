export const evaluateGuess = (secret, guess) => {
    const secretDigits = [...secret.toLowerCase()];
    const guessDigits = [...guess.toLowerCase()];
    const bulls = secretDigits.filter((digit, index) => digit === guessDigits[index]).length;
    const nonBullSecret = secretDigits.filter((digit, index) => digit !== guessDigits[index]);
    const nonBullGuess = guessDigits.filter((digit, index) => digit !== secretDigits[index]);
    const cows = nonBullGuess.filter((digit) => nonBullSecret.includes(digit)).length;
    return { bulls, cows };
};
//# sourceMappingURL=evaluateGuess.js.map