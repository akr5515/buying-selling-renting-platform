import { Alert, AlertColor, Box, Snackbar } from "@mui/material";

const CustomSnackbar = ({
  openState,
  snackbarMessage,
  alertColor,
  handleClose,
}: {
  openState: boolean;
  snackbarMessage: string;
  alertColor: AlertColor;
  handleClose: () => void;
}) => {
  return (
    <Box>
      <Snackbar
        open={openState}
        autoHideDuration={1200}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={alertColor ? alertColor : "success"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CustomSnackbar;
