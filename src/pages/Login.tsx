import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuthContext } from "../providers/AuthProvider";

interface LoginProps {
  email: string;
  password: string;
}

interface ErrorProps {
  emailError?: string;
  passwordError?: string;
}

export default function Login() {
  const { user, handleLogin } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from.pathname || "/";

  const [loginError, setLoginError] = useState<ErrorProps>({});

  function getData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as Record<string, string>;
    const loginData: LoginProps = {
      email: data.email || "",
      password: data.password || "",
    };

    const newErrors: ErrorProps = {};
    /* { [key: string]: string } */

    if (loginData.email === "") {
      newErrors.emailError = "Please fill the email adress";
    }

    if (loginData.password === "") {
      newErrors.passwordError = "Please fill the password";
    }

    const hasError = Object.keys(newErrors).length > 0;

    if (hasError) {
      setLoginError(newErrors);
      return;
    }

    setLoginError({});
    console.log("SENT");
    handleLogin({ ...loginData, userId: "123" });
    navigate(from, { replace: true });
  }

  /*  if (user.email)
    return (
      <div>
        <h1 className="p-5 text-center font-bold">Welcome {user.email}</h1>
        <div className="flex justify-center pb-5">
          <button
            className="rounded-md bg-orange-500 p-1 px-3 text-white"
            onClick={() => {
              handleLogin({});
            }}
          >
            Logout
          </button>
        </div>
      </div>
    ); */

  return (
    <div className="bg-my-beige flex flex-1 flex-col gap-15 px-10 py-15">
      {location.state?.auth && (
        <p className="text-center text-red-500">{location.state.auth}</p>
      )}
      <h1 className="text-center text-3xl font-bold">Sign in to your accout</h1>
      <form className="flex flex-col gap-3" onSubmit={getData}>
        <label htmlFor="email" className="flex flex-col gap-1">
          <span>Email:</span>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email adress"
            className="outline-my-orange w-full rounded-md border border-gray-400 bg-white p-2 pl-3 placeholder:text-gray-400"
          />
        </label>
        {loginError.emailError && (
          <p className="text-xs text-red-500">{loginError.emailError}</p>
        )}
        <label htmlFor="password" className="flex flex-col gap-1">
          <span>Password:</span>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="outline-my-orange w-full rounded-md border border-gray-400 bg-white p-2 pl-3 placeholder:text-gray-400"
          />
        </label>
        {loginError.passwordError && (
          <p className="text-xs text-red-500">{loginError.passwordError}</p>
        )}
        <button className="bg-my-orange mt-5 rounded-md p-4 text-white">
          Log in
        </button>
      </form>
    </div>
  );
}
