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
  INVUL?: number;
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

  function CheckInvul() {
    let check = false;

    stats.forEach((statline) => {
      if (statline.INVUL !== null) {
        check = true;
      }
    });

    return check;
  }

  return (
    <div className={style.unitStatlineWrapper}>
      <div className={style.statWrapper}>
        <div className={style.statChar}>M</div>
        {stats.map((statline, i) => (
          <div className={style.statValBorder}>
            <div className={style.statVal}>{statline.M}</div>
          </div>
        ))}
      </div>
      <div className={style.statWrapper}>
        <div className={style.statChar}>T</div>
        {stats.map((statline, i) => (
          <div className={style.statValBorder}>
            <div className={style.statVal}>{statline.T}</div>
          </div>
        ))}
      </div>
      <div className={style.statWrapper}>
        <div className={style.statChar}>SV</div>
        {stats.map((statline, i) => (
          <div className={style.statValBorder}>
            <div className={style.statVal}>{statline.SV}</div>
          </div>
        ))}
      </div>
      <div className={style.statWrapper}>
        <div className={style.statChar}>W</div>
        {stats.map((statline, i) => (
          <div className={style.statValBorder}>
            <div className={style.statVal}>{statline.W}</div>
          </div>
        ))}
      </div>
      <div className={style.statWrapper}>
        <div className={style.statChar}>LD</div>
        {stats.map((statline, i) => (
          <div className={style.statValBorder}>
            <div className={style.statVal}>{statline.LD}</div>
          </div>
        ))}
      </div>
      <div className={style.statWrapper}>
        <div className={style.statChar}>OC</div>
        {stats.map((statline, i) => (
          <div className={style.statValBorder}>
            <div className={style.statVal}>{statline.OC}</div>
          </div>
        ))}
      </div>
      {CheckInvul() ? (
        <div className={style.statWrapper}>
          <div className={style.statChar}>INVUL</div>
          {stats.map((statline, i) => (
            <div className={style.statValBorder}>
              <div className={style.statVal}>{statline.INVUL}+</div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
