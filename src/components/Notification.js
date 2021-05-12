import React from "react";
import { useSnackbar } from "notistack";

export default function Notification({
  data,
  errorData,
  message,
  click,
  setClick,
}) {
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (click) {
      if (data == errorData) {
        enqueueSnackbar(message, {
          variant: "warning",
          autoHideDuration: 6000,
          preventDuplicate: true,
        });
        setClick(false);
      }
    }
  }, [click]);

  return null;
}
