import React, { useContext, useEffect } from "react";
import { toast } from "sonner";
import { UserContext } from "../Display";

function Header() {
  const user = useContext(UserContext);

  return (
    <header>
      <h1>
        {user?.role && user.role.charAt(0).toUpperCase() + user.role.slice(1)}{" "}
        Pannel
      </h1>
      <article className="user">
        <img
          src={`${import.meta.env.VITE_SERVER_URL}/profiles/${user.profile}`}
          alt=""
        />
        <h3>{user.name}</h3>
      </article>
    </header>
  );
}

export default Header;
