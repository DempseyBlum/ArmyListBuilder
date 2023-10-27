import React from "react";
import style from "./rangedWeaponTable.module.scss";

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
              <td>{statline.BS}</td>
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
