import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  CreateIcon,
  Dashboard,
  LogsIcon,
  OrdersIcon,
  ProductIcon,
  UsersIcon,
} from "../../SVG/SVG";
import "./components.css";
import { toast } from "sonner";
import { logout } from "../../services/session.service";

function Aside() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await logout();
      if (!res.ok) throw new Error(res.message);

      navigate("/login");
      return toast.success(res.message);
    } catch (error) {
      return toast.error(error.message);
    }
  };

  return (
    <aside>
      <article className="head">
        <Link className="logo" to="/products">
          <h1>
            <span>
              <Dashboard />
            </span>
            <p>Dashboard</p>
          </h1>
        </Link>
      </article>

      <ul className="urls">
        <li>
          <NavLink to={"/products"}>
            <span>
              <ProductIcon />
            </span>
            <p>Products</p>
          </NavLink>
        </li>

        <li>
          <NavLink to={"/create"}>
            <span>
              <CreateIcon />
            </span>
            <p>Create Products</p>
          </NavLink>
        </li>

        <li>
          <NavLink to={"/orders"}>
            <span>
              <OrdersIcon />
            </span>
            <p>Orders</p>
          </NavLink>
        </li>

        <li>
          <NavLink to={"/users"}>
            <span>
              <UsersIcon />
            </span>
            <p>Users</p>
          </NavLink>
        </li>

        <li>
          <NavLink to={"/logs"}>
            <span>
              <LogsIcon />
            </span>
            <p>Logs</p>
          </NavLink>
        </li>
      </ul>

      <button className="logout" onClick={handleLogout}>
        Log out
      </button>
    </aside>
  );
}

export default Aside;
