import React, { Dispatch, SetStateAction } from "react";
import style from "./navMenu.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const NavMenu = ({
  showMenu,
  setShowMenu,
  title,
}: {
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
  title: string;
}) => {
  function CloseMenu() {
    setShowMenu(false);
  }

  return (
    <div className={style.navMenuWrapper} hidden={!showMenu}>
      <div className={style.menuHeader}>
        <button className={style.menuBurger} onClick={CloseMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <h1 className={style.menuHeaderTitle}>{title}</h1>
      </div>
      <div className={style.navOptionsList}>
        <Link to="/" onClick={CloseMenu}>
          <div className={style.navOption}>
            <FontAwesomeIcon icon={faHome} />
            Home
          </div>
        </Link>
      </div>
    </div>
  );
};
