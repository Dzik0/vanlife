import { Link } from "react-router";
import PCMenu from "./Menu/PCMenu";
import MobileMenu from "./Menu/MobileMenu";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-my-beige relative flex flex-row items-center justify-between p-4 px-6">
      <div className="text-2xl font-bold">
        <Link
          to="/"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          #VANLIFE
        </Link>
      </div>
      <PCMenu />
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
}
