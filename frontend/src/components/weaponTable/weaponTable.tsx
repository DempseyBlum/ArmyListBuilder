import React from "react";
import style from "./weaponTable.module.scss";

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

export type MeleeWeapon = {
  id: string;
  Keywords: string[];
  Name: string;
  Range: string;
  A: string;
  WS: string;
  S: string;
  AP: string;
  D: string;
};

export default function WeaponTable({
  rangedWeapons,
  meleeWeapons,
}: {
  rangedWeapons: RangedWeapon[];
  meleeWeapons: MeleeWeapon[];
}) {
  return (
    <div className={style.weaponTableWrapper}>
      <table>
        <thead>
          <tr>
            <th>Ranged Weapons</th>
            <th>Range</th>
            <th>A</th>
            <th>BS</th>
            <th>S</th>
            <th>AP</th>
            <th>D</th>
          </tr>
        </thead>
        <tbody>
          {rangedWeapons.map((statline, i) => (
            <tr key={"statline" + i}>
              <td>
                {statline.Name}{" "}
                {statline.Keywords.map((keyword) => {
                  return <div>[{keyword}]</div>;
                })}
              </td>
              <td>{statline.Range}</td>
              <td>{statline.A}</td>
              <td>{statline.BS}</td>
              <td>{statline.S}</td>
              <td>{statline.AP}</td>
              <td>{statline.D}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>Melee Weapons</th>
            <th>Range</th>
            <th>A</th>
            <th>WS</th>
            <th>S</th>
            <th>AP</th>
            <th>D</th>
          </tr>
        </thead>
        <tbody>
          {meleeWeapons.map((statline, i) => (
            <tr key={"statline" + i}>
              <td>
                {statline.Name}{" "}
                {statline.Keywords.map((keyword) => {
                  return <div>[{keyword}]</div>;
                })}
              </td>
              <td>{statline.Range}</td>
              <td>{statline.A}</td>
              <td>{statline.WS}</td>
              <td>{statline.S}</td>
              <td>{statline.AP}</td>
              <td>{statline.D}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
