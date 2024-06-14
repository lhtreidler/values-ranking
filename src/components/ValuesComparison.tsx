import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { Value } from "../constants";

type ValuesComparisonProps = {
  values: [Value, Value];
  onSubmit: (index: number) => void;
};

export const ValuesComparison = ({
  values,
  onSubmit,
}: ValuesComparisonProps) => {
  return (
    <Stack direction="column" spacing={3}>
      <Typography textAlign="center" variant="h3">
        Which feels more true to you?
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        {values.map(({ name, description }, i) => (
          <>
            <Card
              onClick={() => onSubmit(i)}
              key={i}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: 200,
                height: 180,
                cursor: "pointer",
                ":hover": {
                  boxShadow: 7, // theme.shadows[20]
                },
              }}
            >
              <CardContent>
                <Typography textAlign="center" variant="body1" mb={2}>
                  {name}
                </Typography>
                <Typography textAlign="center" component="p" variant="caption">
                  {description}
                </Typography>
              </CardContent>
            </Card>
            {i === 0 && <Typography variant="body2"> OR </Typography>}
          </>
        ))}
      </Stack>
    </Stack>
  );
};
