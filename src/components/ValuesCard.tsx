import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { Value, ValueScore, values } from "../constants";
import { SyntheticEvent, useEffect, useState } from "react";

export const ValuesCard = ({
  name,
  description,
  score,
  onNext,
}: ValueScore & {
  onNext: (val: number) => void;
}) => {
  const [rating, setRating] = useState(0);

  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    value: number | null
  ) => {
    if (value && value > 0) {
      onNext(value);
    }
  };

  useEffect(() => {
    setRating(score);
  }, [name]);

  useEffect(() => {
    onNext(Math.floor(Math.random() * 5));
  }, [name]);

  return (
    <Stack
      direction="column"
      spacing={3}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Typography textAlign="center" variant="h4">
        First, rate each value based on how important it is to you
      </Typography>
      <Card
        sx={{
          width: 400,
          maxWidth: "100%",
          mt: 8,
          py: 3,
        }}
      >
        <CardContent>
          <Stack
            spacing={2}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h4" mb={2}>
              {name}
            </Typography>
            <Typography textAlign="center" variant="body1">
              {description}
            </Typography>
            <Rating size="large" value={rating} onChange={handleChange} />
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};
