//@ts-nocheck
"use client";
import { supabase } from "@/utils/supabase/client";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ConfirmProvider } from "material-ui-confirm";
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
    supabase.auth.onAuthStateChange((event, session) => {
      alert("auth state change " + session?.user?.id);
      if (session?.user?.id) {
        OneSignalDeferred.push(function () {
          OneSignal.login(session.user.id);
          OneSignal.User.addAlias("external_id", session.user.id);
        });
      } else {
        OneSignalDeferred.push(function () {
          OneSignal.logout();
        });
      }
    });

    return () => {
      window.OneSignalDeferred = undefined;
    };
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ConfirmProvider>{children}</ConfirmProvider>
    </LocalizationProvider>
  );
};

export default AppWrapper;
