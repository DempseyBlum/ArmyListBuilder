import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./header.module.scss";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { NavMenu } from "../navMenu/navMenu";
import { useState } from "react";

export default function Header({ title }: { title: string }) {
  const [showMenu, setShowMenu] = useState(false);

  function OpenMenu() {
    setShowMenu(true);
  }

  return (
    <div className={style.headerWrapper}>
      <div className={style.headerLeft}>
        <button className={style.menuBurger} onClick={OpenMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <h1 className={style.pageHeader}>{title}</h1>
      </div>
      <div className={style.headerRight}>
        <FontAwesomeIcon icon={faUser} />
      </div>
      <NavMenu showMenu={showMenu} setShowMenu={setShowMenu} title={title} />
    </div>
  );
}
