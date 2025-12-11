import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../API/Api";
import { useAuthContext } from "../../providers/AuthProvider";

interface User {
  email: string;
  password: string;
}

interface ErrorProps {
  email?: string;
  password?: string;
  fb?: string;
}

export default function Login() {
  const location = useLocation();
  /* const from = location.state?.from.pathname || "/"; */
  const [user, setUser] = useState<User>({ email: "", password: "" });
  const [logging, setLogging] = useState(false);
  const [errors, setErrors] = useState<ErrorProps>({});
  const { loggedUser, loading } = useAuthContext();

  async function SignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newErrors: ErrorProps = {};
    /* { [key: string]: string } */

    if (user.email === "") {
      newErrors.email = "Please fill the email adress";
    }

    if (user.password === "") {
      newErrors.password = "Please fill the password";
    }

    const hasError = Object.keys(newErrors).length > 0;

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    try {
      setLogging(true);
      await signInWithEmailAndPassword(auth, user.email, user.password);
    } catch (err: any) {
      console.error(err);
      console.log(err.code);
      if (err.code === "auth/invalid-credential") {
        setErrors((pS) => ({ ...pS, fb: "Wrong password" }));
      }
    } finally {
      setLogging(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;
    setUser((pS) => ({ ...pS, [name]: value }));
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

  if (loading) return <p>LOADING..</p>;

  if (loggedUser) return <Navigate to="/host" replace />;

  return (
    <div className="bg-my-beige flex flex-1 flex-col gap-15 px-10 py-15">
      {location.state?.auth && (
        <p className="text-center text-red-500">{location.state.auth}</p>
      )}
      <h1 className="text-center text-3xl font-bold">Sign in to your accout</h1>
      <form className="flex flex-col gap-3" onSubmit={SignIn}>
        <label htmlFor="email" className="flex flex-col gap-1">
          <span>Email:</span>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            autoComplete="off"
            id="email"
            placeholder="Email adress"
            className="outline-my-orange w-full rounded-md border border-gray-400 bg-white p-2 pl-3 placeholder:text-gray-400"
          />
        </label>
        {errors?.email && (
          <p className="text-xs text-red-500">{errors.email}</p>
        )}
        <label htmlFor="password" className="flex flex-col gap-1">
          <span>Password:</span>
          <input
            onChange={handleChange}
            type="password"
            autoComplete="off"
            name="password"
            id="password"
            placeholder="Password"
            className="outline-my-orange w-full rounded-md border border-gray-400 bg-white p-2 pl-3 placeholder:text-gray-400"
          />
        </label>
        {errors?.password && (
          <p className="text-xs text-red-500">{errors.password}</p>
        )}
        {errors?.fb && <p className="text-xs text-red-500">{errors.fb}</p>}
        <button className="bg-my-orange mt-5 rounded-md p-4 text-white">
          {logging ? "Logging..." : "Log in"}
        </button>
      </form>
      <div className="flex flex-col gap-2">
        <div className="cursor-pointer text-center underline underline-offset-2 hover:font-bold">
          <Link to="/recover">Forgot password?</Link>
        </div>
        <div className="cursor-pointer text-center underline underline-offset-2 hover:font-bold">
          <Link to="/register">Don't have an account? Register now!</Link>
        </div>
      </div>
    </div>
  );
}
