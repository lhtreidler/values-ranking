import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

import { ValueScores } from "../constants";
import ReactConfetti from "react-confetti";
import { BarChart, BarChartProps, PieChart } from "@mui/x-charts";

export const FinalValuesList = ({
  values,
  onRestart,
}: {
  values: ValueScores;
  onRestart: () => void;
}) => {
  const maxScore = Math.max(...values.map(({ score }) => score));

  return (
    <Stack spacing={3}>
      <Box
        position="fixed"
        top={0}
        bottom={0}
        left={0}
        right={0}
        overflow="hidden"
      >
        <ReactConfetti numberOfPieces={900} recycle={false} />
      </Box>

      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
      >
        <Typography variant="h4" width="100%" textAlign="center" mb={3}>
          Your Top Values
        </Typography>

        {values.map(({ name, description }, i) => (
          <Card key={i} sx={{ width: 200, mx: 2, my: 1 }}>
            <CardContent>
              <Typography variant="body2">{i + 1}.</Typography>
              <Typography textAlign="center" variant="body1">
                {name}
              </Typography>
              <Typography component="p" textAlign="center" variant="caption">
                {description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Card sx={{ px: { xs: 0, sm: 2, md: 4 }, py: 2 }} variant="outlined">
        <CardContent>
          <Typography textAlign="center" variant="h5">
            How your values compare:
          </Typography>
          <BarChart
            series={[
              { data: values.map(({ score }) => (score / maxScore) * 10) },
            ]}
            height={400}
            margin={{ left: 100 }}
            yAxis={[
              { data: values.map(({ name }) => name), scaleType: "band" },
            ]}
            xAxis={[{ label: "Rating out of 10" }]}
            layout="horizontal"
          />
        </CardContent>
      </Card>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography my={2} variant="body1">
          Doesn't feel accurate?
        </Typography>
        <Button onClick={onRestart} variant="outlined">
          Start over
        </Button>
      </Box>
    </Stack>
  );
};
