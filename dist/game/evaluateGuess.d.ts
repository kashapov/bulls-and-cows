export type GuessResult = {
    bulls: number;
    cows: number;
};
export declare const evaluateGuess: (secret: string, guess: string) => GuessResult;
