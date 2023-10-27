import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./header.module.scss";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";

export default function Header({ title }: { title: string }) {
  return (
    <div className={style.headerWrapper}>
      <div className={style.headerLeft}>
        <FontAwesomeIcon icon={faBars} />
        <h1 className={style.pageHeader}>{title}</h1>
      </div>
      <div className={style.headerRight}>
        <FontAwesomeIcon icon={faUser} />
      </div>
    </div>
  );
}
