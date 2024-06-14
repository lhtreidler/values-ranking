import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { Value, values } from "../constants";
import { SyntheticEvent, useEffect, useState } from "react";

export const ValuesCard = ({
  name,
  description,
  onNext,
}: Value & {
  onNext: (val: number) => void;
}) => {
  const [rating, setRating] = useState(0);

  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    value: number | null
  ) => {
    if (value && value > 0) {
      onNext(value);
      setRating(0);
    }
  };

  // useEffect(() => {
  //   onNext(Math.floor(Math.random() * 5));
  // }, [name]);

  return (
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
  );
};
