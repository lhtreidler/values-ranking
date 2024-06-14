import { initialValues, values } from "./values";

export type Value = (typeof values)[number];

export type ValueScores = typeof initialValues;

export type ValueScore = ValueScores[number];

export type ValueName = Value["name"];
