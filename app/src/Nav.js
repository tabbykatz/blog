import * as React from "react";

import { NavLink } from "react-router-dom";

import * as classes from "./Nav.module.scss";

const Nav = () => {
  return (
    <nav>
      <ul className={classes.ul}>
        <li className={classes.li}>
          <NavLink
            to=""
            end
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Home
          </NavLink>
        </li>
        <li className={classes.li}>
          <NavLink
            to="add-post"
            end
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Add Post
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
