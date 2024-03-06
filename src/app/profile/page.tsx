"use client";
import { supabase } from "@/utils/supabase/client";
import { Button, Typography } from "@mui/material";
import { User } from "@supabase/supabase-js";
import { useConfirm } from "material-ui-confirm";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Profile = () => {
  const router = useRouter();
  const confirm = useConfirm();
  const [user, setUser] = React.useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then((user) => {
      setUser(user?.data?.user);
      console.log(user?.data?.user);
    });
  }, []);

  return (
    <div style={{ margin: "2vw" }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Profile
      </Typography>

      <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
        {user?.email}
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
