//@ts-nocheck
"use client";
import { ConfirmProvider } from "material-ui-confirm";
import React, { useEffect } from "react";

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    window.OneSignal = window.OneSignal || [];
    OneSignal.push(function () {
      OneSignal.init({
        appId: "b40b7cc7-13dc-4662-8b48-efa668f9b72a",
        notifyButton: {
          enable: true,
        },

        allowLocalhostAsSecureOrigin: true,
      });
    });

    return () => {
      window.OneSignal = undefined;
    };
  }, []);
  return <ConfirmProvider>{children}</ConfirmProvider>;
};

export default AppWrapper;
