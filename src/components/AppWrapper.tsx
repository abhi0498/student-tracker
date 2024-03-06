//@ts-nocheck
"use client";
import { ConfirmProvider } from "material-ui-confirm";
import Head from "next/head";
import Script from "next/script";
import React, { useEffect } from "react";

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    OneSignalDeferred.push(function () {
      OneSignal.init({
        appId: "b40b7cc7-13dc-4662-8b48-efa668f9b72a",
        notifyButton: {
          enable: true,
        },

        allowLocalhostAsSecureOrigin: true,
      });
    });

    return () => {
      window.OneSignalDeferred = undefined;
    };
  }, []);
  return <ConfirmProvider>{children}</ConfirmProvider>;
};

export default AppWrapper;
