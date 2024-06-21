import {
  Box,
  Dialog,
  DialogContent,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { ratingText } from "../constants";

export const IntroModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog open={open} onClose={onClose} sx={{ py: 2, px: 1 }}>
      <DialogContent>
        <Stack spacing={3}>
          <Typography variant="h5">What are your values?</Typography>
          <Typography variant="body1">
            This website will help you determine your top 10 values in under 5
            minutes.
            <br></br>
            <br></br>
            You'll be asked to rate each value on a scale from 1-5, based on
            it's importance to you, then compare your connection to each one.
          </Typography>
          <Stack spacing={2} direction="column">
            {Object.entries(ratingText).map(([val, text], i) => (
              <Stack key={i} spacing={1} direction="row">
                <Rating value={Number(val)} />
                <Typography variant="body2">{text}</Typography>
              </Stack>
            ))}
          </Stack>
          <Typography variant="caption">
            Source: Miller, W.R., C’deBaca, J., & Matthews, D.B. (1994). Values
            Card Sort. Unpublished manuscript: University of New Mexico
          </Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
