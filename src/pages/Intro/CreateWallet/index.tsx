import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Button from "../../../components/Button";
import FormInput from "../../../components/Form/HookForm/FormInput";

import useLogin from "../../../hooks/useLogin";
import useOAuthSignup from "../../../hooks/useOAuthSignup";
import useSignup from "../../../hooks/useSignup";

import useStore from "../../../store/store";

import { setIdentity } from "../../../helpers/indentity";
import { setPrivateKey } from "../../../helpers/privateKey";

import web3 from "../../../web3";

import {ReactComponent as GoBackWhite} from "../../../assets/icons/go-back-white.svg";
import styles from "./CreateWallet.module.scss";

interface FormData {
  privateKey: string;
  password: string;
  confirmPassword: string;
}

function CreateWallet() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const user = useStore((store) => store.user);
  const setCurrentStep = useStore((store) => store.setCurrentStep);
  const { signup } = useSignup();
  const { signup: oauthSignup } = useOAuthSignup();
  const { login } = useLogin();

  const onSubmit: SubmitHandler<FormData> = async ({
    privateKey,
    password,
  }) => {
    try {
      const keyStore = web3.eth.accounts.encrypt(privateKey, password);
      const account = web3.eth.accounts.privateKeyToAccount(privateKey);
      let res;
      if (user?.token) {
        res = await oauthSignup({
          password,
          walletAddress: account.address,
          keyStore,
        });
      } else {
        res = await signup({
          password,
          walletAddress: account.address,
          keyStore,
        });
      }
      if (res.status === 201) {
        setPrivateKey(privateKey);
        setIdentity(JSON.stringify(res?.payload?.x509Identity));
        await login(password);
        setCurrentStep({
          current: "backup",
          previous: "createWallet",
        });
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.payload ?? "Sorry an error happened");
    }
  };

  return (
    <div className={styles.CreateWallet}>
      <div className={styles.Header}>
        <Button
          noStyle
          className={styles.BackButton}
          onClick={() => {
            setCurrentStep({
              current: "helpUs",
            });
          }}
        >
          <GoBackWhite />
        </Button>

        <div className={styles.Title}>Let’s import your ethereum wallet</div>
      </div>
      <p className={styles.Description}>
        Please place your Ethereum private key and create a password to protect
        your certificate.
      </p>
      <form className={styles.FormContainer} onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Private Key"
          name="private-key"
          round
          register={register("privateKey", {
            required: { value: true, message: "Private key is required" },
          })}
        />
        <FormInput
          error={errors.password}
          type="password"
          placeholder="Create Password"
          round
          register={register("password", {
            required: { value: true, message: "Password is required" },
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        />
        <FormInput
          round
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
          placeholder="Confirm Password"
        />
        <Button size="large" type="submit" variant="primary">
          Link Wallet
        </Button>
      </form>
      <Button
        type="button"
        size="large"
        variant="secondary"
        onClick={() =>
          setCurrentStep({
            current: "passwordSetup",
            previous: "createWallet",
          })
        }
      >
        Create New Wallet
      </Button>
    </div>
  );
}

export default CreateWallet;
