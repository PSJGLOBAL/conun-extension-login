import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Button from "../../../components/Button";
import FormInput from "../../../components/Form/HookForm/FormInput";

import useSignup from "../../../hooks/useSignup";
import useStore from "../../../store/store";
import useLogin from "../../../hooks/useLogin";
import useOAuthSignup from "../../../hooks/useOAuthSignup";

import web3 from "../../../web3";

import { setIdentity } from "../../../helpers/indentity";
import { setPrivateKey } from "../../../helpers/privateKey";

import {ReactComponent as GoBackWhite} from "../../../assets/icons/go-back-white.svg";

import styles from "./PasswordSetup.module.scss";

interface FormData {
  password: string;
  confirmPassword: string;
}

function PasswordSetup() {
  const setCurrentStep = useStore((store) => store.setCurrentStep);
  const user = useStore((state) => state.user);
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { signup, isLoading } = useSignup();
  const { signup: oAuthSignup, isLoading: oAuthLoading } = useOAuthSignup();
  const { login, isLoading: loginLoading } = useLogin();

  const onSubmit: SubmitHandler<FormData> = async ({ password }) => {
    try {
      const { privateKey, address } = web3.eth.accounts.create(password);
      const keyStore = web3.eth.accounts.encrypt(privateKey, password);
      const stringKeystore = JSON.stringify(keyStore);

      let res;

      if (user?.token) {
        res = await oAuthSignup({
          walletAddress: address,
          keyStore: JSON.parse(stringKeystore),
          password,
        });
      } else {
        res = await signup({
          walletAddress: address,
          keyStore: JSON.parse(stringKeystore),
          password,
        });
      }

      if (res.status === 201) {
        setPrivateKey(privateKey);
        setIdentity(res?.payload?.x509Identity);
        await login(password);
        setCurrentStep({
          current: "backup",
          previous: "passwordSetup",
        });
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.payload ?? "Sorry an error happened");
    }
  };
  return (
    <div className={styles.PasswordSetup}>
      <div className={styles.Header}>
        <Button
          noStyle
          className={styles.BackButton}
          onClick={() => {
            setCurrentStep({
              current: "createWallet",
            });
          }}
        >
          <GoBackWhite />
        </Button>

        <div className={styles.Title}>Create Wallet</div>
      </div>
      <p className={styles.Description}>
        Set up a password to protect your wallet. You will use this to unlock
        your wallet in the future.
      </p>
      <form className={styles.FormContainer} onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          id="password-requirement"
          error={errors.password}
          type="password"
          label="Create a Password"
          round
          helperText="Minimum 6 characters"
          register={register("password", {
            required: { value: true, message: "Password is required" },
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        />

        <FormInput
          register={register("confirmPassword", {
            required: { value: true, message: "Confirm your password" },
            validate: {
              passwordMatch: (value) =>
                value !== getValues().password
                  ? "Passwords should match"
                  : "" || true,
            },
          })}
          error={errors.confirmPassword}
          type="password"
          label="Confirm Password"
          round
        />
        <Button
          type="submit"
          size="large"
          loading={isLoading || oAuthLoading || loginLoading}
          variant="primary"
          font="fontLarge"
          className={styles.CreateWalletButton}
        >
          Save Password
        </Button>
      </form>
    </div>
  );
}

export default PasswordSetup;
