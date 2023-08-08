import styles from "./header.module.scss";

export default function Header({ title }: { title: string }) {
  return <div className={styles.pageHeader}>{title}</div>;
}
