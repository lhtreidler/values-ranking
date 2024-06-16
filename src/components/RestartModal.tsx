import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

export const RestartModal = ({
  onSubmit,
  isOpen,
  handleClose,
}: {
  onSubmit: () => void;
  handleClose: () => void;
  isOpen: boolean;
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to start over?
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onSubmit} autoFocus>
          I'm sure
        </Button>
      </DialogActions>
    </Dialog>
  );
};
