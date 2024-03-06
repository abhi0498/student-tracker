//@ts-nocheck
"use client";
import { supabase } from "@/utils/supabase/client";
import { ConfirmProvider } from "material-ui-confirm";
import Head from "next/head";
import Script from "next/script";
import React, { useEffect } from "react";

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState(null);
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
    supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user?.id) {
        OneSignalDeferred.push(function () {
          OneSignal.login(session.user.id);
        });
      }
    });

    return () => {
      window.OneSignalDeferred = undefined;
    };
  }, []);

  return <ConfirmProvider>{children}</ConfirmProvider>;
};

export default AppWrapper;
