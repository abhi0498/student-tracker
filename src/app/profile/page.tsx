"use client";
import { supabase } from "@/utils/supabase/client";
import { Button, Typography } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { useRouter } from "next/navigation";
import React from "react";

const Profile = () => {
  const router = useRouter();
  const confirm = useConfirm();
  return (
    <div style={{ margin: "2vw" }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Profile
      </Typography>

      <Button
        variant="contained"
        onClick={async () => {
          confirm({
            description: "Are you sure you want to logout?",
            title: "Warning!",
          }).then(async () => {
            await supabase.auth.signOut();
            router.push("/login");
          });
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default Profile;
