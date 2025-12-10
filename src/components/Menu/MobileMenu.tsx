import { NavLink, Link } from "react-router";
import burger from "/burger.svg";
import user from "/user.svg";
import { type Dispatch, type SetStateAction } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  return (
    <nav className="flex flex-row items-center gap-8">
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
      <button
        className="w-7"
        onClick={() => {
          setIsOpen((pS) => !pS);
        }}
      >
        <img src={burger} alt="Burger logo" />
      </button>
    </nav>
  );
}
