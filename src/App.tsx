import _ from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Value, ValueScores, initialValues, values } from "./constants";
import { ValuesCard } from "./components/ValuesCard";
import { ValuesComparison } from "./components/ValuesComparison";
import { cutLosers, getEloScores } from "./utils/helpers";
import { FinalValuesList } from "./components/FinalValuesList";
import { Grid } from "@mui/material";

const App = () => {
  const [scoredValues, setScoredValues] = useState<ValueScores>(initialValues);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stageNumber, setStageNumber] = useState(1);
  const [indexesToCompare, setIndexesToCompare] = useState<
    [number, number] | null
  >(null);

  const currentValue = useMemo(() => values[currentIndex], [currentIndex]);
  const valuesToCompare = useMemo<[Value, Value] | null>(
    () =>
      indexesToCompare
        ? (indexesToCompare.map((i) => _.omit(scoredValues[i])) as unknown as [
            Value,
            Value
          ])
        : null,
    [scoredValues, indexesToCompare]
  );

  const updateScore = (index: number, addedScore: number) => {
    setScoredValues((prev) => {
      prev[index].score = prev[index].score + addedScore;
      return prev;
    });
  };

  const onNext = (rating: number) => {
    updateScore(currentIndex, rating);
    if (scoredValues[currentIndex + 1]) setCurrentIndex((prev) => prev + 1);
    else {
      setStageNumber(2);
      updateState();
    }
  };

  const updateState = () => {
    const newScoredValues = cutLosers(scoredValues);
    setScoredValues(newScoredValues);

    if (newScoredValues.length <= 10) {
      setStageNumber(3);
      console.log(newScoredValues);
      return;
    }

    setIndexesToCompare([0, newScoredValues.length - 1]);
  };

  const onCompareValues = (index: number) => {
    if (!indexesToCompare) return;

    const updatedScores = [...scoredValues];

    const loserIndex = indexesToCompare[Math.abs(index - 1)];
    const winnerIndex = indexesToCompare[index];

    const { newWinnerRating, newLoserRating } = getEloScores(
      updatedScores[winnerIndex].score,
      updatedScores[loserIndex].score
    );

    console.log({ newWinnerRating, newLoserRating });

    updatedScores[winnerIndex].score = newWinnerRating;
    updatedScores[loserIndex].score = newLoserRating;

    const [first, second] = indexesToCompare;

    if (first + 2 >= second) {
      updateState();
    } else {
      setIndexesToCompare([first + 1, second - 1]);
    }
  };

  const cardProps = {
    ...currentValue,
    onNext,
  };

  return (
    <Grid
      container
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      mt={4}
    >
      <Grid item xs={11} sm={10} md={9} lg={4}>
        {stageNumber === 1 && <ValuesCard {...cardProps} />}
        {stageNumber === 2 && valuesToCompare && (
          <ValuesComparison
            values={valuesToCompare}
            onSubmit={onCompareValues}
          />
        )}
        {stageNumber === 3 && <FinalValuesList values={scoredValues} />}
      </Grid>
    </Grid>
  );
};

export default App;
