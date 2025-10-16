import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Cart, MenuBars, Search, XClose } from "../../utils/SVG";
import "./components.css";

function Header() {
  return (
    <header>
      <div className="up">
        <Link to={"/"} className="logo">
          <h1>DailyMarket</h1>
        </Link>

        <article className="mobile">
          <span
            className="bars"
            onClick={() => (
              document
                .getElementsByClassName("mobile")[0]
                .classList.add("active"),
              document.getElementsByClassName("nav")[0].classList.add("active")
            )}
          >
            <MenuBars />
          </span>
          <span
            className="close"
            onClick={() => (
              document
                .getElementsByClassName("mobile")[0]
                .classList.remove("active"),
              document
                .getElementsByClassName("nav")[0]
                .classList.remove("active")
            )}
          >
            <XClose />
          </span>
        </article>

        <nav className="nav">
          <ul className="menu">
            <li>
              <NavLink to={"/products"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/about"}>About us</NavLink>
            </li>
            <li>
              <NavLink to={"/contact"}>Contact</NavLink>
            </li>
          </ul>

          <Link to={"/cart"} className="cart">
            <Cart />
            <span className="count">0</span>
          </Link>
        </nav>
      </div>
      <article className="search">
        <form>
          <input type="text" placeholder="Search..." />
          <button type="submit">
            <Search />
          </button>
        </form>
      </article>
    </header>
  );
}

export default Header;
