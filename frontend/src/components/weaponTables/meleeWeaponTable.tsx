import React from "react";
import style from "./meleeWeaponTable.module.scss";

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

export default function MeleeWeaponTable({
  weapons,
}: {
  weapons: MeleeWeapon[];
}) {
  return (
    <div className={style.weaponTableWrapper}>
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
          {weapons.map((statline, i) => (
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
