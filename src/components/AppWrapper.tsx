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
        appId: "ac3e837e-8f13-4eec-baa0-d08188667414",
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
