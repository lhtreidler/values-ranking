import _ from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  StoredValues,
  Value,
  ValueScores,
  initialValues,
  localStorageKey,
  values,
} from "./constants";
import { ValuesCard } from "./components/ValuesCard";
import { ValuesComparison } from "./components/ValuesComparison";
import { cutLevel, cutLosers, getEloScores } from "./utils/helpers";
import { FinalValuesList } from "./components/FinalValuesList";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Fade,
  Grid,
  LinearProgress,
  Stack,
} from "@mui/material";
import { RestartModal } from "./components/RestartModal";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ValuesPdf } from "./components/ValuesPdf";

const App = () => {
  const [scoredValues, setScoredValues] = useState<ValueScores>(initialValues);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stageNumber, setStageNumber] = useState(1);
  const [indexesToCompare, setIndexesToCompare] = useState<
    [number, number] | null
  >(null);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [restartModalOpen, setRestartModalOpen] = useState(false);

  useEffect(() => {
    if (stageNumber === 1)
      setProgress(currentIndex && (currentIndex / scoredValues.length) * 50);
    if (stageNumber === 2) {
      const step = 50 / 100;
      setProgress((prev) => Math.min(prev + step, 96));
      console.log("progress:", progress);
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

  const updateScore = (index: number, score: number) => {
    setScoredValues((prev) => {
      prev[index].score = score;
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

  const onRestart = () => {
    setScoredValues(initialValues);
    setIndexesToCompare(null);
    setCurrentIndex(0);
    setStageNumber(1);
    setProgress(0);
    setRestartModalOpen(false);
  };

  const cardProps = {
    ...currentValue,
    onNext,
  };

  const showBackButton = stageNumber === 1 && currentIndex > 0;

  useEffect(() => {
    if (isLoading) return;
    localStorage.setItem(
      localStorageKey,
      JSON.stringify({
        updatedAt: new Date().toISOString(),
        scoredValues,
        stageNumber,
        indexesToCompare,
        currentIndex,
        progress,
      } as StoredValues)
    );
  }, [scoredValues, currentIndex, stageNumber, indexesToCompare, progress]);

  useEffect(() => {
    const storedValues = JSON.parse(
      localStorage.getItem(localStorageKey) || "null"
    ) as StoredValues;

    if (storedValues) {
      setScoredValues(storedValues.scoredValues);
      setIndexesToCompare(storedValues.indexesToCompare);
      setCurrentIndex(storedValues.currentIndex);
      setStageNumber(storedValues.stageNumber);
      setProgress(storedValues.progress);
    }
    setIsLoading(false);
  }, []);

  const restartModalProps = {
    handleClose: () => setRestartModalOpen(false),
    isOpen: restartModalOpen,
    onSubmit: onRestart,
  };

  return (
    <Grid
      container
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      mt={1}
      minHeight="100vh"
    >
      <Grid item xs={11} sm={10} md={9} lg={4}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Fade in={!isLoading} timeout={1000}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="space-between"
              minHeight="95vh"
              py={3}
              justifyContent="space-between"
            >
              {restartModalOpen && <RestartModal {...restartModalProps} />}
              <Stack direction="column">
                <Box
                  width="100%"
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  height={60}
                >
                  <div>
                    {showBackButton && (
                      <Button
                        sx={{ height: 30 }}
                        variant="outlined"
                        onClick={onBack}
                      >
                        Back
                      </Button>
                    )}
                  </div>
                  {currentIndex !== 0 && stageNumber < 3 && (
                    <Button
                      sx={{ height: 30, zIndex: 2 }}
                      variant="outlined"
                      color="error"
                      onClick={() => setRestartModalOpen(true)}
                    >
                      Start over
                    </Button>
                  )}
                  {stageNumber === 3 && (
                    <Button variant="outlined" sx={{ height: 35, zIndex: 2 }}>
                      <PDFDownloadLink
                        style={{ textDecoration: "none", color: "#1976d2" }}
                        document={<ValuesPdf values={scoredValues} />}
                        fileName="top_values.pdf"
                      >
                        {({ loading }) =>
                          loading ? "Loading document..." : "Download as PDF"
                        }
                      </PDFDownloadLink>
                    </Button>
                  )}
                </Box>

                {stageNumber === 1 && <ValuesCard {...cardProps} />}
                {stageNumber === 2 && valuesToCompare && (
                  <ValuesComparison
                    values={valuesToCompare}
                    onSubmit={onCompareValues}
                  />
                )}
                {stageNumber === 3 && (
                  <FinalValuesList
                    values={scoredValues}
                    onRestart={onRestart}
                  />
                )}
              </Stack>
              <LinearProgress
                variant="determinate"
                sx={{ my: 6 }}
                value={progress}
              />
            </Box>
          </Fade>
        )}
      </Grid>
    </Grid>
  );
};

export default App;
