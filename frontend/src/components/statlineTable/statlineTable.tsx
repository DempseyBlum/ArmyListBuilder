import React, { useEffect, useState } from "react";
import {
  Datasheet,
  SingleDatasheetReturnType,
} from "../../../queries/datasheetQueries";
import style from "./statlineTable.module.scss";

export type Stats = {
  Name: String;
  M: number;
  T: number;
  SV: number;
  W: number;
  LD: number;
  OC: number;
  INVUL: number;
};

export default function StatlineTable({
  unitDatasheet,
}: {
  unitDatasheet: Datasheet;
}) {
  const [stats, setStats] = useState<Stats[]>([]);

  useEffect(() => {
    if (!unitDatasheet) {
      return;
    }
    // Get all the stats
    let newStats = [...stats];
    unitDatasheet.attributes.unit_composition.map((model) => {
      if (newStats.length === 0) {
        newStats = [
          {
            Name: model.model.data.attributes.display_name,
            M: model.model.data.attributes.movement,
            T: model.model.data.attributes.toughness,
            SV: model.model.data.attributes.save,
            W: model.model.data.attributes.wounds,
            LD: model.model.data.attributes.leadership,
            OC: model.model.data.attributes.objective_control,
            INVUL: model.model.data.attributes.invul_save,
          },
        ];
      } else {
        let check = false;

        // Check models stats compared to existing stats. Only push them if they are different.
        newStats.forEach((statline) => {
          if (statline.M !== model.model.data.attributes.movement) {
            check = true;
          } else if (statline.T !== model.model.data.attributes.toughness) {
            check = true;
          } else if (statline.SV !== model.model.data.attributes.save) {
            check = true;
          } else if (statline.W !== model.model.data.attributes.wounds) {
            check = true;
          } else if (statline.LD !== model.model.data.attributes.leadership) {
            check = true;
          } else if (
            statline.OC !== model.model.data.attributes.objective_control
          ) {
            check = true;
          } else if (
            statline.INVUL !== model.model.data.attributes.invul_save
          ) {
            check = true;
          }
        });

        if ((check = false)) {
          newStats.push({
            Name: model.model.data.attributes.display_name,
            M: model.model.data.attributes.movement,
            T: model.model.data.attributes.toughness,
            SV: model.model.data.attributes.save,
            W: model.model.data.attributes.wounds,
            LD: model.model.data.attributes.leadership,
            OC: model.model.data.attributes.objective_control,
            INVUL: model.model.data.attributes.invul_save,
          });
        }
      }
    });
    setStats([...newStats]);
  }, [unitDatasheet]);

  return (
    <div className={style.statlineTableWrapper}>
      <table>
        <thead>
          <tr>
            <th>M</th>
            <th>T</th>
            <th>SV</th>
            <th>W</th>
            <th>LD</th>
            <th>OC</th>
            <th>INVUL</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((statline, i) => (
            <tr key={"statline" + i}>
              <td>{statline.M + `"`}</td>
              <td>{statline.T}</td>
              <td>{statline.SV + "+"}</td>
              <td>{statline.W}</td>
              <td>{statline.LD}</td>
              <td>{statline.OC}</td>
              <td>{statline.INVUL + "+"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
