import { useState } from "react";
import { auth, db } from "../API/Api";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "../providers/AuthProvider";
import { Navigate } from "react-router";
import { doc, setDoc } from "firebase/firestore";

interface ErrorsProps {
  email?: string;
  password?: string;
  firebase?: string;
}

export default function Register() {
  const { loggedUser, loading } = useAuthContext();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ErrorsProps>({});
  const [loadingReg, setLoadingReg] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser((pS) => ({ ...pS, [name]: value }));
  }

  async function handleForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    /* const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData); */
    const newErrors: ErrorsProps = {};

    if (!user.email) {
      newErrors.email = "Email is missing";
    }

    if (user.password.split("").length < 6) {
      newErrors.password = "Password must be at least 6 latters";
    }

    if (!user.password) {
      newErrors.password = "Password is missing";
    }

    const hasErrors = Object.keys(newErrors).length > 0;

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoadingReg(true);
      const userCred = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password,
      );

      const firebaseUser = userCred.user;
      await setDoc(doc(db, "users", firebaseUser.uid), {
        name: "",
        phone: "",
        email: firebaseUser.email,
        createdAt: new Date(),
      });
    } catch (err: any) {
      console.error("This is your auth error:", err);
      /*       console.log("YOUR CODE:", err.code); */

      if (err.code === "auth/email-already-in-use") {
        setErrors({ firebase: "Email is already in use!" });
      }
    } finally {
      setLoadingReg(false);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (loggedUser) return <Navigate to="/host" replace />;

  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="flex w-full flex-col gap-10 px-10 py-15">
        <h1 className="text-center text-3xl font-bold">Create an Account</h1>

        <form onSubmit={handleForm} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email:</label>
            <input
              placeholder="Test@gmail.com"
              type="email"
              name="email"
              id="email"
              className="outline-my-orange w-full rounded-md border border-gray-400 bg-white p-2 pl-3 placeholder:text-gray-400"
              onChange={handleChange}
              value={user.email}
            />
            {errors?.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password:</label>
            <input
              placeholder="Password..."
              type="password"
              name="password"
              id="password"
              className="outline-my-orange w-full rounded-md border border-gray-400 bg-white p-2 pl-3 placeholder:text-gray-400"
              onChange={handleChange}
              value={user.password}
            />
            {errors?.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>
          <button className="bg-my-orange mt-5 cursor-pointer rounded-md p-4 text-white">
            {loadingReg ? "Creating..." : "Sign Up!"}
          </button>
        </form>
        {errors?.firebase && (
          <p className="text-center text-sm text-red-500">{errors.firebase}</p>
        )}
      </div>
    </div>
  );
}
