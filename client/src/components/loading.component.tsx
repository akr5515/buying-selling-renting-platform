import { CircularProgress, Backdrop } from "@mui/material";

const LoadingComponent = () => {
  return (
    <Backdrop open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingComponent;
