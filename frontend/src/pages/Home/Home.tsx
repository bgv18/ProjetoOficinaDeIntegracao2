
import { useNavigate } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import { GreenButton } from "../../components/GreenButton";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={4}
      sx={{ width: "80%", m: "0 auto" }}
    >
      <Typography variant="h1" align="center">
        Sistema feito para a disciplina de Oficina de Integracao 2
      </Typography>

      <Typography variant="body1" align="center">
        Bruno Guerra Vieira e Igor Bregagnoli
      </Typography>

      <GreenButton
        variant="contained"
        onClick={() =>
          localStorage.getItem("token") ? navigate("/main") : navigate("/login")
        }
        sx={{
          color: "white",
          width: "300px",
        }}
      >
        Acessar
      </GreenButton>
    </Stack>
  );
};
