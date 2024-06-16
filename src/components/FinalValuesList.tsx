import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { ValueScores } from "../constants";

export const FinalValuesList = ({
  values,
  onRestart,
}: {
  values: ValueScores;
  onRestart: () => void;
}) => {
  return (
    <Stack spacing={3}>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
      >
        <Typography variant="h2" width="100%" textAlign="center" mb={3}>
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
