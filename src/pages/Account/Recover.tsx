import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../API/Api";

interface ErrorProps {
  email?: string;
  firebase?: string;
}

export default function Recover() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<ErrorProps>({});
  const [reseting, setReseting] = useState(false);
  const [done, setDone] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.currentTarget;
    setEmail(value);
  }

  function handleReset() {
    const newErrors: ErrorProps = {};
    if (email === "") {
      newErrors.email = "Please provide your email address";
    }

    const hasErrors = Object.values(newErrors).length > 0;

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    resetPassword();
  }

  async function resetPassword() {
    try {
      setErrors({});
      setReseting(true);
      await sendPasswordResetEmail(auth, email);
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/invalid-email") {
        setErrors({ firebase: "Sorry, this email address doesn't exist" });
      }
    } finally {
      setReseting(false);
    }

    if (!errors.firebase) {
      setDone(true);
    }
  }

  if (done) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <h1 className="text-2xl font-bold">
          Your reset password email has been sent!
        </h1>
        <p>Please check your spam folder</p>
      </div>
    );
  }

  return (
    <div className="bg-my-beige flex flex-1 flex-col items-center justify-center">
      <div className="flex flex-col gap-5 p-20">
        <h1 className="text-center text-2xl font-bold">Password Reset</h1>
        <p className="text-center">
          We'll email you a link that can reset your password if you're having
          trouble signing in.
        </p>
        <div className="flex flex-col gap-8">
          <label htmlFor="email">
            <input
              placeholder="Test@gmail.com"
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              className="outline-my-orange w-full rounded-md border border-gray-400 bg-white p-2 pl-3 placeholder:text-gray-400"
            />
          </label>

          <div className="flex justify-center">
            <button
              className="bg-my-orange rounded-md p-3 text-center font-bold text-white"
              onClick={handleReset}
            >
              {reseting ? "Reseting your password..." : "Reset password"}
            </button>
          </div>
        </div>
        {errors?.email && (
          <p className="text-center text-sm text-red-500">{errors.email}</p>
        )}
        {errors?.firebase && (
          <p className="text-center text-sm text-red-500">{errors.firebase}</p>
        )}
      </div>
    </div>
  );
}
