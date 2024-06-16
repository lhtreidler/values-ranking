import { Box, Card, CardContent, Fade, Stack, Typography } from "@mui/material";
import { Value } from "../constants";
import { useEffect, useState } from "react";

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

  const onClick = (i: number) => {
    setFadeIn(false);
    const timeout = setTimeout(() => {
      console.log("submit");
      onSubmit(i);
    }, 500);
  };

  useEffect(() => {
    setReverseVal(Math.random() > 0.5 ? "-reverse" : "");
    setFadeIn(true);
  }, [values]);

  return (
    <Stack direction="column" spacing={3}>
      <Typography textAlign="center" variant="h3">
        Which feels more true to you?
      </Typography>
      <Fade in={fadeIn} timeout={1000}>
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
                onClick={() => onClick(i)}
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
                }}
              >
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
              </Card>
              {i === 0 && <Typography variant="body2"> OR </Typography>}
            </>
          ))}
        </Stack>
      </Fade>
    </Stack>
  );
};
