import { signOut } from "firebase/auth";
import { useAuthContext } from "../../providers/AuthProvider";
import user from "/user.svg";
import { NavLink, Link } from "react-router";
import { auth } from "../../API/Api";

export default function PCMenu() {
  const { loggedUser } = useAuthContext();

  return (
    <nav className="hidden xl:block">
      <ul className="flex flex-row items-center gap-5">
        <li>
          <NavLink
            to="host"
            className={({ isActive }) =>
              `hover:underline hover:opacity-70 active:font-bold ${isActive ? "font-bold" : ""}`
            }
          >
            Host
          </NavLink>
        </li>
        <li>
          <NavLink
            to="about"
            className={({ isActive }) =>
              `hover:underline hover:opacity-70 active:font-bold ${isActive ? "font-bold" : ""}`
            }
          >
            About
          </NavLink>
        </li>
        <li>
          {" "}
          <NavLink
            to="vans"
            className={({ isActive }) =>
              `hover:underline hover:opacity-70 active:font-bold ${isActive ? "font-bold" : ""}`
            }
          >
            Vans
          </NavLink>
        </li>
        <li>
          {!loggedUser ? (
            <Link to="login">
              <div className="w-5">
                <img src={user} alt="user logo" />
              </div>
            </Link>
          ) : (
            <button
              className="cursor-pointer text-sm"
              onClick={() => {
                signOut(auth);
              }}
            >
              Log out
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}
