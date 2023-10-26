import React, { useEffect } from "react";
import style from "./unitComposition.module.scss";
import {
  CompositionOption,
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
  function GetDefaultWargearString() {
    if (unitDatasheet.attributes.unit_composition.length === 0) {
      console.log("ERROR: No models found in unit");
      return [];
    }

    // For units with only one model
    if (
      unitDatasheet.attributes.unit_composition.length === 1 &&
      unitDatasheet.attributes.extra_unit_compositions.length === 0
    ) {
      let defaultWargear = "";
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
      return [
        (IsSingularModel(unitDatasheet.attributes.unit_composition[0])
          ? "This model is equipped with: "
          : "Every model is equipped with: ") + defaultWargear,
      ];
    }

    let defaultWargearList = [];
    let modelsUsed = [];

    unitDatasheet.attributes.unit_composition.forEach((compositionOption) => {
      modelsUsed.push(compositionOption.model.data.id);
      const modelName = compositionOption.model.data.attributes.display_name;

      let defaultWargear = "";
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

      defaultWargearList.push(
        (IsSingularModel(compositionOption)
          ? "The " + modelName + " is equipped with: "
          : "Every " + modelName + " is equipped with: ") + defaultWargear
      );
    });

    unitDatasheet.attributes.extra_unit_compositions.forEach(
      (extraCompositionOptions) => {
        extraCompositionOptions.unit_composition.forEach(
          (compositionOption) => {
            // Extra compositions often include duplicate models, so we need to check if we've already added them
            if (modelsUsed.includes(compositionOption.model.data.id)) {
              return;
            }
            modelsUsed.push(compositionOption.model.data.id);
            const modelName =
              compositionOption.model.data.attributes.display_name;

            let defaultWargear = "";
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

            defaultWargearList.push(
              (IsSingularModel(compositionOption)
                ? "The " + modelName + " is equipped with: "
                : "Every " + modelName + " is equipped with: ") + defaultWargear
            );
          }
        );
      }
    );

    return defaultWargearList;
  }

  // Function to determine if the unit is a singular model.
  // If it is, then the gear options should be displayed as 'this model'
  function IsSingularModel(compositionOption: CompositionOption) {
    if (
      compositionOption.min > 1 ||
      (compositionOption.max && compositionOption.max > 1)
    ) {
      // Units with squad sizes can't be singular
      return false;
    }

    return true;
  }

  return (
    <div className={style.unitCompositionWrapper}>
      <ul>
        {unitDatasheet.attributes.extra_unit_compositions.length > 0 ? (
          // If there are extra unit compositions, then we use a different display
          <>
            <li>
              {unitDatasheet.attributes.unit_composition.map(
                (modelComposition, i, array) => {
                  return (
                    <>
                      {modelComposition.min}
                      {modelComposition.max
                        ? "-" + modelComposition.max
                        : ""}{" "}
                      {modelComposition.model.data.attributes.display_name}
                      {i < array.length - 1
                        ? i < array.length - 2
                          ? ", "
                          : " and "
                        : ""}
                    </>
                  );
                }
              )}
            </li>
            {unitDatasheet.attributes.extra_unit_compositions.map(
              (extraCompositions) => {
                return (
                  <>
                    <div>OR</div>
                    <li>
                      {extraCompositions.unit_composition.map(
                        (modelComposition, i, array) => {
                          return (
                            <>
                              {modelComposition.min}
                              {modelComposition.max
                                ? "-" + modelComposition.max
                                : ""}{" "}
                              {
                                modelComposition.model.data.attributes
                                  .display_name
                              }
                              {i < array.length - 1
                                ? i < array.length - 2
                                  ? ", "
                                  : " and "
                                : ""}
                            </>
                          );
                        }
                      )}
                    </li>
                  </>
                );
              }
            )}
          </>
        ) : (
          unitDatasheet.attributes.unit_composition.map((modelComposition) => {
            if (unitDatasheet.attributes.extra_unit_compositions.length === 0) {
              return (
                <li>
                  {modelComposition.min}
                  {modelComposition.max ? "-" + modelComposition.max : ""}{" "}
                  {modelComposition.model.data.attributes.display_name}
                </li>
              );
            }
          })
        )}
      </ul>
      <div className={style.defaultWargear}>
        {GetDefaultWargearString().map((modelWargear) => {
          return <p>{modelWargear}</p>;
        })}
      </div>
    </div>
  );
}
