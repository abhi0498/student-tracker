"use client";
import { supabase } from "@/utils/supabase/client";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const Profile = () => {
  const router = useRouter();
  return (
    <div style={{ margin: "2vw" }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Profile
      </Typography>

      <Button
        variant="contained"
        onClick={async () => {
          await supabase.auth.signOut();
          router.push("/login");
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default Profile;
