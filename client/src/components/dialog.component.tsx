import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import React from "react";

const CustomDialog = ({
  isDialogOpen,
  onDialogClose,
  description,
  onClickYes,
}) => {
  return (
    <Box>
      <Dialog open={isDialogOpen} onClose={onDialogClose}>
        <DialogContent>{description}</DialogContent>
        <DialogActions>
          <Button onClick={onDialogClose} color="primary">
            No
          </Button>
          <Button onClick={onClickYes} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomDialog;
