import {
  Box,
  Button,
  Card,
  CardContent,
  Fade,
  Stack,
  Typography,
} from "@mui/material";
import { Value } from "../constants";
import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";

type ValuesComparisonProps = {
  values: [Value, Value];
  onSubmit: (index: number) => void;
};

export const ValuesComparison = ({
  values,
  onSubmit,
}: ValuesComparisonProps) => {
  const [reverseVal, setReverseVal] = useState<"" | "-reverse">("");
  const [fadeIn, setFadeIn] = useState(false);
  const [selected, setSelected] = useState<null | number>(null);

  const onClick = () => {
    if (selected === null) return;
    setFadeIn(false);

    onSubmit(selected);
    setSelected(null);
  };

  useEffect(() => {
    setReverseVal(Math.random() > 0.5 ? "-reverse" : "");
    setFadeIn(true);
    // onSubmit(Math.random() > 0.5 ? 1 : 0);
  }, [values]);

  const getStyles = (index: number) => {
    return index === selected
      ? {
          backgroundColor: "primary.main",
          color: "white",
        }
      : {
          backgroundColor: "white",
          color: "primary.main",
        };
  };

  return (
    <Stack direction="column" spacing={3}>
      <Typography textAlign="center" variant="h5">
        Which feels more true to you?
      </Typography>

      <Stack
        direction={{ xs: `column${reverseVal}`, sm: `row${reverseVal}` }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        {values.map(({ name, description }, i) => (
          <>
            <Card
              variant="outlined"
              onClick={() => setSelected(i)}
              key={name}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: 200,
                height: 180,
                cursor: "pointer",
                ":hover": {
                  boxShadow: 7,
                },
                transition: "background-color 0.5s",
                ...getStyles(i),
              }}
            >
              <Fade in={fadeIn} timeout={100}>
                <CardContent>
                  <Typography textAlign="center" variant="body1" mb={2}>
                    {name}
                  </Typography>
                  <Typography
                    textAlign="center"
                    component="p"
                    variant="caption"
                  >
                    {description}
                  </Typography>
                </CardContent>
              </Fade>
            </Card>
          </>
        ))}
      </Stack>
      <Box display="flex" flexDirection="row" justifyContent="center">
        <Button
          variant="outlined"
          sx={{ width: "fit-content" }}
          onClick={onClick}
        >
          Next
        </Button>
      </Box>
    </Stack>
  );
};
