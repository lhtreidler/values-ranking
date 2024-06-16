import { initialValues, values } from "./values";

export type Value = (typeof values)[number];

export type ValueScores = typeof initialValues;

export type ValueScore = ValueScores[number];

export type ValueName = Value["name"];

export type StoredValues = {
  updatedAt: string;
  scoredValues: ValueScores;
  stageNumber: 1 | 2 | 3;
  indexesToCompare: [number, number] | null;
  currentIndex: number;
  progress: number;
} | null;
