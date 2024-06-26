import {
  Box,
  Button,
  Card,
  CardContent,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { ValueScore, ratingText, values } from "../constants";
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
  const [hover, setHover] = useState(-1);

  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    value: number | null
  ) => {
    if (value && value > 0) setRating(value);
  };

  const onSubmit = () => {
    if (rating) onNext(rating);
  };

  useEffect(() => {
    setRating(score);
    setHover(-1);

    // onNext(Math.ceil(Math.random() * 5));
  }, [name]);

  return (
    <Stack
      direction="column"
      spacing={3}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Typography textAlign="center" variant="h5">
        First, rate each value based on how important it is to you
      </Typography>
      <Card
        variant="outlined"
        sx={{
          width: 400,
          maxWidth: "100%",
          mt: 8,
          py: 3,
        }}
      >
        <CardContent>
          <Stack
            spacing={0}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box height={130}>
              <Typography textAlign="center" variant="h4" mb={2}>
                {name}
              </Typography>
              <Typography textAlign="center" variant="body1">
                {description}
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              maxWidth="100%"
            >
              <Rating
                size="large"
                value={rating}
                onChange={handleChange}
                max={5}
                onChangeActive={(_e, val) => setHover(val)}
              />
              <Typography minHeight={20} pt={1} variant="body2">
                {ratingText[hover > -1 ? hover : rating] || ""}
              </Typography>
            </Box>
            <Button sx={{ mt: 3 }} variant="outlined" onClick={onSubmit}>
              Next
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};
