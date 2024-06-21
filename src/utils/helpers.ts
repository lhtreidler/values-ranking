import _ from "lodash";
import { Value, ValueScores } from "../constants";

export const cutLevel = 0.6;

export const cutLosers = (scoredValues: ValueScores) => {
  let currentVals = [...scoredValues];
  currentVals.sort((a, b) => b.score - a.score);

  let cutIndex = Math.max(Math.ceil(currentVals.length * cutLevel), 10);

  if (cutIndex % 2 === 1) cutIndex += 1;

  let found = false;

  while (!found) {
    const midScore = currentVals[cutIndex]?.score;
    const nextScore = currentVals[cutIndex + 1]?.score;

    if (!nextScore) {
      found = true;
    } else {
      if (midScore !== nextScore) {
        found = true;
      } else {
        // cut evenly
        cutIndex = cutIndex + 2;
      }
    }
  }

  if (currentVals.slice(0, cutIndex).length % 2 !== 0)
    throw new Error(`Length is ${currentVals.slice(0, cutIndex).length}`);

  return currentVals.slice(0, cutIndex);
};

const kVal = 1;

const calculateRating = (userA: number, userB: number) =>
  1 / (1 + Math.pow(10, (userB - userA) / 400));

export const getEloScores = (winnerRating: number, loserRating: number) => {
  const winnerExpected = calculateRating(winnerRating, loserRating);
  const loserExpected = calculateRating(loserRating, winnerRating);

  return {
    newWinnerRating: winnerRating + kVal * (1 - winnerExpected),
    newLoserRating: loserRating + kVal * (0 - loserExpected),
  };
};
