import _ from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Value, ValueScores, initialValues, values } from "./constants";
import { ValuesCard } from "./components/ValuesCard";
import { ValuesComparison } from "./components/ValuesComparison";
import { cutLevel, cutLosers, getEloScores } from "./utils/helpers";
import { FinalValuesList } from "./components/FinalValuesList";
import { Box, Button, Grid, LinearProgress, Stack } from "@mui/material";

const App = () => {
  const [scoredValues, setScoredValues] = useState<ValueScores>(initialValues);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stageNumber, setStageNumber] = useState(1);
  const [indexesToCompare, setIndexesToCompare] = useState<
    [number, number] | null
  >(null);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (stageNumber === 1)
      setProgress(currentIndex && (currentIndex / scoredValues.length) * 50);
    if (stageNumber === 2) {
      const step = 50 / 55;
      setProgress((prev) => Math.min(prev + step, 96));
    }
    if (stageNumber === 3) setProgress(100);
  }, [currentIndex, indexesToCompare, stageNumber]);

  const currentValue = useMemo(
    () => scoredValues[currentIndex],
    [currentIndex]
  );
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
    if (scoredValues[currentIndex + 1]) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setStageNumber(2);
      updateState();
    }
  };

  const onBack = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  const updateState = () => {
    const newScoredValues = cutLosers(scoredValues);
    setScoredValues(newScoredValues);

    if (newScoredValues.length <= 10) {
      setStageNumber(3);
      console.log(newScoredValues);
      return;
    }

    setIndexesToCompare([0, Math.round(newScoredValues.length / 2)]);
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

    updatedScores[winnerIndex].score = newWinnerRating;
    updatedScores[loserIndex].score = newLoserRating;

    const [first, second] = indexesToCompare;

    setScoredValues(updatedScores);

    if (!updatedScores[second + 1]) {
      updateState();
    } else {
      setIndexesToCompare([first + 1, second + 1]);
    }
  };

  const cardProps = {
    ...currentValue,
    onNext,
  };

  const showBackButton = stageNumber === 1 && currentIndex > 0;

  return (
    <Grid
      container
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      mt={4}
      minHeight="100vh"
    >
      <Grid item xs={11} sm={10} md={9} lg={4}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="space-between"
          minHeight="95vh"
          py={3}
          justifyContent="space-between"
        >
          <Stack direction="column">
            {showBackButton && <Button onClick={onBack}>Back</Button>}
            {stageNumber === 1 && <ValuesCard {...cardProps} />}
            {stageNumber === 2 && valuesToCompare && (
              <ValuesComparison
                values={valuesToCompare}
                onSubmit={onCompareValues}
              />
            )}
            {stageNumber === 3 && <FinalValuesList values={scoredValues} />}
          </Stack>
          <LinearProgress
            variant="determinate"
            sx={{ my: 6 }}
            value={progress}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default App;
