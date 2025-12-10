import user from "/user.svg";
import { NavLink, Link } from "react-router";

export default function PCMenu() {
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
          <Link to="login">
            <div className="w-5">
              <img src={user} alt="user logo" />
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
