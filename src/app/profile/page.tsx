"use client";
import { supabase } from "@/utils/supabase/client";
import { Button, Grid, Typography } from "@mui/material";
import { User } from "@supabase/supabase-js";
import { useConfirm } from "material-ui-confirm";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

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

  const clearAllData = async () => {
    confirm({
      description: "Are you sure you want to delete all data?",
      title: "Warning!",
    }).then(async () => {
      const data = await supabase
        .from("student")
        .delete()
        .eq("created_by", user?.id!);

      if (data.error) {
        toast.error(data.error.message);
      } else {
        toast.success("All data deleted");
      }
    });
  };
  const logout = async () => {
    confirm({
      description: "Are you sure you want to logout?",
      title: "Warning!",
    }).then(async () => {
      await supabase.auth.signOut();
      router.push("/login");
    });
  };
  return (
    <div style={{ margin: "2vw" }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Profile
      </Typography>

      <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
        {user?.email}
      </Typography>
      <Grid
        container
        spacing={2}
        px={6}
        style={{
          position: "absolute",
          bottom: "10vh",
        }}
      >
        <Grid item xs={12} width={"100%"}>
          <Button
            variant="contained"
            onClick={clearAllData}
            color="error"
            fullWidth
          >
            Clear All Data
          </Button>
        </Grid>
        <Grid item xs={12} width={"100%"}>
          <Button variant="contained" onClick={logout} fullWidth>
            Logout
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
