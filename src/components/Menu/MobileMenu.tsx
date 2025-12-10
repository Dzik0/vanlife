import { NavLink, Link } from "react-router";
import burger from "/burger.svg";
import user from "/user.svg";
import { type Dispatch, type SetStateAction } from "react";
import { useAuthContext } from "../../providers/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../../API/Api";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  const { loggedUser, loading } = useAuthContext();

  return (
    <nav className="flex flex-row items-center gap-8 xl:hidden">
      {isOpen && (
        <div className="bg-my-beige absolute top-22 right-5 left-5 z-30 rounded-md shadow-[0px_5px_15px_0px_black]">
          <ul className="flex flex-col items-center gap-5 p-5">
            <li>
              <NavLink
                onClick={() => {
                  setIsOpen(false);
                }}
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
                onClick={() => {
                  setIsOpen(false);
                }}
                to="about"
                className={({ isActive }) =>
                  `hover:underline hover:opacity-70 active:font-bold ${isActive ? "font-bold" : ""}`
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => {
                  setIsOpen(false);
                }}
                to="vans"
                className={({ isActive }) =>
                  `hover:underline hover:opacity-70 active:font-bold ${isActive ? "font-bold" : ""}`
                }
              >
                Vans
              </NavLink>
            </li>
          </ul>
        </div>
      )}
      {!loggedUser ? (
        <Link
          to="login"
          onClick={() => {
            setIsOpen(false);
          }}
        >
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
      <button
        className="w-7 cursor-pointer"
        onClick={() => {
          setIsOpen((pS) => !pS);
        }}
      >
        <img src={burger} alt="Burger logo" />
      </button>
    </nav>
  );
}
