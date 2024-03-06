//@ts-nocheck
"use client";
import { ConfirmProvider } from "material-ui-confirm";
import Head from "next/head";
import Script from "next/script";
import React, { useEffect } from "react";

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    OneSignalDeferred.push(function (OneSignal) {
      OneSignal.init({
        appId: "f567c986-15be-4591-93f8-1054dcd29fcd",
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
