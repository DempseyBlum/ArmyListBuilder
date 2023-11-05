import React from "react";
import style from "./weaponTable.module.scss";
import classnames from "classnames";

export type RangedWeapon = {
  id: string;
  Keywords: string[];
  Name: string;
  Range: string;
  A: string;
  BS: string;
  S: string;
  AP: string;
  D: string;
};

export default function RangedWeaponTable({
  weapons,
}: {
  weapons: RangedWeapon[];
}) {
  function ReturnKeywords(keywords: string[]) {
    return (
      <div className={style.keywordsWrapper}>
        [
        {keywords.map((keyword, i, array) => {
          return (
            <div className={style.keyword}>
              {i > 0 ? <>&nbsp;</> : ""}
              {keyword}
              {i < array.length - 1 ? "," : ""}
            </div>
          );
        })}
        ]
      </div>
    );
  }

  return (
    <div className={style.weaponTableWrapper}>
      <table>
        <thead className={style.statHeaders}>
          <tr>
            <th className={classnames(style.nameHeader, style.statHeader)}>
              RANGED WEAPONS
            </th>
            <th className={style.statHeader}>Range</th>
            <th className={style.statHeader}>A</th>
            <th className={style.statHeader}>BS</th>
            <th className={style.statHeader}>S</th>
            <th className={style.statHeader}>AP</th>
            <th className={style.statHeader}>D</th>
          </tr>
        </thead>
        <tbody>
          {weapons.map((statline, i) => (
            <tr key={"statline" + i} className={style.stats}>
              <td className={classnames(style.weaponName, style.stat)}>
                <div className={style.nameWrapper}>
                  {statline.Name}{" "}
                  {statline.Keywords.length > 0
                    ? ReturnKeywords(statline.Keywords)
                    : ""}
                </div>
              </td>
              <td className={style.stat}>{statline.Range}</td>
              <td className={style.stat}>{statline.A}</td>
              <td className={style.stat}>{statline.BS}</td>
              <td className={style.stat}>{statline.S}</td>
              <td className={style.stat}>{statline.AP}</td>
              <td className={style.stat}>{statline.D}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
