import React from "react";
import { Link } from "react-router-dom";

import { CiLogin } from "react-icons/ci";
import { GiPineTree } from "react-icons/gi";

import { IoCreate } from "react-icons/io5";
const Header = () => {
  return (
    <>
      <div className="flex  justify-between py-6 md:ml-6 md:mr-6 items-center bg-slate-50 rounded-sm">
        <div className="ml-4 flex md:space-x-6 items-center">
          <GiPineTree className="cursor-pointer" size={35} />

          <Link to={"/"} className="md:text-3xl text-xl font-serif">
            TreeLeafAi
          </Link>
        </div>
        <nav>
          {(
            <ul className="flex md:gap-12 gap-6 md:text-xl text-md mr-4">
              <li>
                <Link className="flex items-center gap-2" to={"/login"}>
                  <CiLogin />
                  Login
                </Link>
              </li>
              <li>
                <Link className="flex items-center gap-2" to={"/register"}>
                  <IoCreate />
                  Register
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </>
  );
};

export default Header;
