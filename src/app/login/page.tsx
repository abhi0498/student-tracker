"use client";
import { supabase } from "@/utils/supabase/client";
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <main
      style={{
        padding: "2vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Container maxWidth="sm">
        <Typography
          variant="h3"
          component="h1"
          textAlign={"center"}
          sx={{ mb: 3 }}
        >
          Welcome to Student Tracker
        </Typography>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="outlined-required"
          label="Email"
          placeholder="Email"
          sx={{ mb: 3, width: "100%" }}
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="outlined-required"
          label="Password"
          placeholder="Password"
          sx={{ mb: 3, width: "100%" }}
        />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Button
              sx={{ width: "100%" }}
              variant="contained"
              color="primary"
              disabled={loading}
              onClick={async () => {
                setLoading(true);
                try {
                  const { data, error } =
                    await supabase.auth.signInWithPassword({
                      email: email,
                      password: password,
                    });
                  if (error) {
                    console.error(error);
                    toast.error(error.message);
                  } else {
                    router.push("/");
                  }
                } catch (error) {
                } finally {
                  setLoading(false);
                }
              }}
            >
              Login
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              disabled={loading}
              sx={{ width: "100%" }}
              variant="contained"
              color="secondary"
              onClick={async () => {
                setLoading(true);
                const { data, error } = await supabase.auth.signUp({
                  email: email,
                  password: password,
                });

                if (error) {
                  console.error(error);
                  toast.error(error.message);
                } else {
                  router.push("/profile");
                }
                setLoading(false);
              }}
            >
              Sign up
            </Button>

            <Button
              sx={{ width: "100%" }}
              variant="text"
              color="primary"
              onClick={() => {
                supabase.auth
                  .signInWithOAuth({
                    provider: "google",
                    options: {
                      redirectTo: new URL("/", window.location.origin).href,
                    },
                  })
                  .then((res) => {
                    debugger;
                    console.log(JSON.stringify(res, null, 2));
                  });
              }}
            >
              Sign in with Google
            </Button>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
