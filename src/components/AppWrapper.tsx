"use client";
import useOneSignal from "@/hooks/useOneSignal";
import { supabase } from "@/utils/supabase/client";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ConfirmProvider } from "material-ui-confirm";
import React, { useEffect, useState } from "react";

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  useOneSignal(user?.id);
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user);
    });
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ConfirmProvider>{children}</ConfirmProvider>
    </LocalizationProvider>
  );
};

export default AppWrapper;
