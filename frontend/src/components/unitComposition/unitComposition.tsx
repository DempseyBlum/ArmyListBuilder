import React, { useEffect } from "react";
import style from "./unitComposition.module.scss";
import {
  Datasheet,
  DatasheetWargear,
  DatasheetWeapon,
} from "../../../queries/datasheetQueries";

function isWargear(
  component: DatasheetWargear | DatasheetWeapon
): component is DatasheetWargear {
  return (component as DatasheetWargear).wargear !== undefined;
}

function isWeapon(
  component: DatasheetWeapon | DatasheetWargear
): component is DatasheetWeapon {
  return (component as DatasheetWeapon).weapon !== undefined;
}

export default function UnitComposition({
  unitDatasheet,
}: {
  unitDatasheet: Datasheet;
}) {
  useEffect(() => {
    console.log("TESTING: ", GetDefaultWargearString());
  }, []);

  function GetDefaultWargearString() {
    if (unitDatasheet.attributes.unit_composition.length === 0) {
      console.log("No models found in unit");
      return "";
    }

    let defaultWargear = "";

    // For units with only one model
    if (unitDatasheet.attributes.unit_composition.length === 1) {
      unitDatasheet.attributes.unit_composition[0].model.data.attributes.default_wargear.forEach(
        (gear, i, array) => {
          if (isWargear(gear)) {
            defaultWargear +=
              gear.wargear.data.attributes.display_name +
              (i < array.length - 1 ? "; " : ".");
          }
          if (isWeapon(gear)) {
            defaultWargear +=
              gear.weapon.data.attributes.display_name +
              (i < array.length - 1 ? "; " : ".");
          }
        }
      );
      console.log("TEST 2", defaultWargear);
      return "Every model is equipped with: " + defaultWargear;
    }

    unitDatasheet.attributes.unit_composition.forEach((model) => {
      if (model.model.data.attributes.default_wargear) {
        defaultWargear += model.model.data.attributes.default_wargear;
      }
    });

    return "TODO";
  }

  return (
    <div className={style.unitCompositionWrapper}>
      <ul>
        {unitDatasheet.attributes.unit_composition.map((modelComposition) => {
          return (
            <li>
              {modelComposition.min}
              {modelComposition.max ? "-" + modelComposition.max : ""}{" "}
              {modelComposition.model.data.attributes.display_name}
            </li>
          );
        })}
      </ul>
      <div className={style.defaultWargear}>{GetDefaultWargearString()}</div>
    </div>
  );
}
