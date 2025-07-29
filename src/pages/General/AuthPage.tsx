import React from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../Hooks/StoreHook";
import { ILoginData } from "../../types/User";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../../services/authService";
import { IAuthInformation } from "../../types/AuthInfo";
import styles from "../../scss/authPage.module.scss";
import {
  Button,
  Checkbox,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";

const AuthPage = () => {
  const navigate = useNavigate();
  const [authorize] = useLoginMutation();
  const { userLogin } = useActions();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ILoginData>({
    defaultValues: {
      login: "",
      password: "",
      isNeedToRemember: false,
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ILoginData> = async (dataS: ILoginData) => {
    await authorize(dataS)
      .unwrap()
      .then((payload: IAuthInformation) => {
        userLogin(payload);
        navigate("/");
      })
      .catch((error: string) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.authBox}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Auth
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <TextField
            {...register("login", {
              required: "Login is required",
            })}
            className={styles.input}
            label="Login"
            fullWidth
            error={!!errors.login}
            helperText={
              errors.login && (
                <FormHelperText error>{errors.login.message}</FormHelperText>
              )
            }
          />

          <TextField
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
            className={styles.input}
            label="Password"
            fullWidth
            error={!!errors.password}
            helperText={
              errors.password && (
                <FormHelperText error>{errors.password.message}</FormHelperText>
              )
            }
          />

          <div className={styles.rememberMe}>
            <Checkbox {...register("isNeedToRemember")} />
            <p>Remember me</p>
          </div>

          <Button
            type="submit"
            size="large"
            variant="contained"
            fullWidth
            className={styles.loginButton}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;