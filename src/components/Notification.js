import React from "react";
import { useSnackbar } from "notistack";

export default function Notification({ data, errorData, message, click, setClick, notificationType }) {
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (click) {      
      if (data === errorData) {
        enqueueSnackbar(message, {
          variant: notificationType,
          autoHideDuration: 6000,
          preventDuplicate: true,
        });
        setClick(false);
      }
    }
  }, [click, data, errorData, enqueueSnackbar, message, notificationType, setClick]);

  return null;
}
