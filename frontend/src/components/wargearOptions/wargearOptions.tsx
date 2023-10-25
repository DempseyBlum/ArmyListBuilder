import React, { useEffect, useState } from "react";
import {
  Datasheet,
  GearChoice,
  WargearOption,
} from "../../../queries/datasheetQueries";
import style from "./wargearOptions.module.scss";

export default function WargearOptions({
  unitDatasheet,
}: {
  unitDatasheet: Datasheet;
}) {
  function GetOptionDotpoints(gearChoices: GearChoice, key: number) {
    const allGear: { numberOf: number; name: string }[] = [];

    if (gearChoices.weapons_to_gain) {
      gearChoices.weapons_to_gain.forEach((weapon) => {
        if (weapon.weapon.data) {
          allGear.push({
            numberOf: weapon.number_of,
            name: weapon.weapon.data.attributes.display_name,
          });
        }
      });
    }

    if (gearChoices.wargear_to_gain) {
      gearChoices.wargear_to_gain.forEach((wargear) => {
        if (wargear.wargear.data) {
          allGear.push({
            numberOf: wargear.number_of,
            name: wargear.wargear.data.attributes.display_name,
          });
        }
      });
    }

    return (
      <li key={"option" + key}>
        {allGear.length > 0
          ? allGear.map((gear, t) => (
              <>
                {(t === 0 ? "" : t === allGear.length - 1 ? " and " : ", ") +
                  gear.numberOf +
                  " " +
                  gear.name}
              </>
            ))
          : ""}
      </li>
    );
  }

  function GetReplacedGearString(option: WargearOption) {
    let gearString = "";
    const allGear: { name: string }[] = [];

    if (option.weapons_to_lose) {
      option.weapons_to_lose.data.forEach((weapon) => {
        if (weapon) {
          allGear.push({
            name: weapon.attributes.display_name,
          });
        }
      });
    }

    if (option.wargear_to_lose) {
      option.wargear_to_lose.data.forEach((wargear) => {
        if (wargear) {
          allGear.push({
            name: wargear.attributes.display_name,
          });
        }
      });
    }

    allGear.forEach(
      (gear, t) =>
        (gearString =
          gearString +
          ((t === 0 ? "" : t === allGear.length - 1 ? " and " : ", ") +
            gear.name))
    );

    return gearString;
  }

  function GetNewGearString(option: WargearOption) {
    let gearString = "";
    const allGear: { numberOf: number; name: string }[] = [];

    if (option.gear_choices[0]) {
      option.gear_choices[0].weapons_to_gain.forEach((weapon) => {
        if (weapon.weapon.data) {
          allGear.push({
            numberOf: weapon.number_of,
            name: weapon.weapon.data.attributes.display_name,
          });
        }
      });
      option.gear_choices[0].wargear_to_gain.forEach((wargear) => {
        if (wargear.wargear.data) {
          allGear.push({
            numberOf: wargear.number_of,
            name: wargear.wargear.data.attributes.display_name,
          });
        }
      });
    }

    allGear.forEach(
      (gear, t) =>
        (gearString =
          gearString +
          ((t === 0 ? "" : t === allGear.length - 1 ? " and " : ", ") +
            gear.numberOf +
            " " +
            gear.name))
    );

    return gearString;
  }

  function GetEquipString(option: WargearOption) {
    const newGear: string = GetNewGearString(option);

    if (IsSingleModelUnit()) {
      return "This model can be equipped with " + newGear + ".";
    }

    if (option.how_many_models_can_take === null) {
      return "Any number of models can be equipped with " + newGear + ".";
    }

    if (option.how_many_models_can_take === 1) {
      return "1 model can be equipped with " + newGear + ".";
    }

    if (option.how_many_models_can_take > 1) {
      return (
        "Up to " +
        option.how_many_models_can_take +
        " models can be equipped with " +
        newGear +
        "."
      );
    }
  }

  function GetEquipStringWithGearChoices(option: WargearOption) {
    const howMany =
      option.how_many_options_can_be_picked === 1
        ? "one of the following:"
        : "any number of the following" +
          (option.allow_duplicates
            ? ", and can take duplicates:"
            : ". You cannot take duplicates:");

    if (IsSingleModelUnit()) {
      return "This model can be equipped with " + howMany;
    }

    if (option.how_many_models_can_take === null) {
      return "Any number of models can be equipped with " + howMany;
    }

    if (option.how_many_models_can_take === 1) {
      return "1 model can be equipped with " + howMany;
    }

    if (option.how_many_models_can_take > 1) {
      return (
        "Up to " +
        option.how_many_models_can_take +
        " models can be equipped with " +
        howMany
      );
    }
  }

  function GetReplacementString(option: WargearOption) {
    const replacedGear: string = GetReplacedGearString(option);
    const newGear: string = GetNewGearString(option);

    if (IsSingleModelUnit()) {
      return (
        "This model's " +
        replacedGear +
        " can be replaced with " +
        newGear +
        "."
      );
    }

    if (option.how_many_models_can_take === null) {
      return (
        "Any number of models can each have their " +
        replacedGear +
        " replaced with " +
        newGear +
        "."
      );
    }

    if (option.how_many_models_can_take === 1) {
      return (
        "1 model's " + replacedGear + " can be replaced with " + newGear + "."
      );
    }

    if (option.how_many_models_can_take > 1) {
      return (
        "Up to " +
        option.how_many_models_can_take +
        " models can have their " +
        replacedGear +
        " replaced with " +
        newGear +
        "."
      );
    }
  }

  function GetReplacementStringWithGearChoices(option: WargearOption) {
    const replacedGear: string = GetReplacedGearString(option);

    const howMany =
      option.how_many_options_can_be_picked === 1
        ? "one of the following:"
        : "any number of the following" +
          (option.allow_duplicates
            ? ", and can take duplicates:"
            : ". You cannot take duplicates:");

    if (IsSingleModelUnit()) {
      return (
        "This model's " + replacedGear + " can be replaced with " + howMany
      );
    }

    if (option.how_many_models_can_take === null) {
      return (
        "Any number of models can each have their " +
        replacedGear +
        " replaced with " +
        howMany
      );
    }

    if (option.how_many_models_can_take === 1) {
      return "1 model's" + replacedGear + "can be replaced with " + howMany;
    }

    if (option.how_many_models_can_take > 1) {
      // Not checking for singule model units becuase this option isn't available for them.
      return (
        "Up to " +
        option.how_many_models_can_take +
        " models can have their " +
        replacedGear +
        " replaced with " +
        howMany
      );
    }
  }

  // Function to determine if the unit is a singular model.
  // If it is, then the gear options should be displayed as 'this model'
  function IsSingleModelUnit() {
    const compOptions = unitDatasheet.attributes.unit_composition_options;

    if (compOptions.length > 1) {
      // Singular models don't have multiple composition options
      return false;
    }

    if (compOptions[0].models_in_unit.length > 1) {
      // Singular models don't have multiple types of models
      return false;
    }

    if (
      compOptions[0].models_in_unit[0].min > 1 ||
      (compOptions[0].models_in_unit[0].max &&
        compOptions[0].models_in_unit[0].max > 1)
    ) {
      console.log("max: ", compOptions[0].models_in_unit[0].max);
      console.log("min: ", compOptions[0].models_in_unit[0].min);
      // Units with squad sizes can't be singular
      return false;
    }

    return true;
  }

  return (
    <div className={style.wargearOptionsWrapper}>
      {unitDatasheet.attributes.wargear_options ? (
        <>
          <div className={style.wargrearOptions}>
            {unitDatasheet.attributes.wargear_options.map((option, i) => {
              if (
                option.wargear_to_lose.data.length > 0 ||
                option.weapons_to_lose.data.length > 0
              ) {
                // This is a replacement option
                return (
                  <>
                    {option.gear_choices.length === 1 ? (
                      /* Wargear options without dotpoints */
                      <div className={style.option}>
                        {GetReplacementString(option)}
                      </div>
                    ) : (
                      /* Wargear options with dotpoint choices */
                      <div className={style.option}>
                        {GetReplacementStringWithGearChoices(option)}
                        <ul>
                          {option.gear_choices.map((gearChoices, i) => (
                            <>{GetOptionDotpoints(gearChoices, i)}</>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                );
              }

              // This is an equip option
              return (
                <>
                  {option.gear_choices.length === 1 ? (
                    /* Wargear options without dotpoints */
                    <div className={style.option}>{GetEquipString(option)}</div>
                  ) : (
                    /* Wargear options with dotpoint choices */
                    <div className={style.option}>
                      {GetEquipStringWithGearChoices(option)}
                      <ul>
                        {option.gear_choices.map((gearChoices, i) => (
                          <>{GetOptionDotpoints(gearChoices, i)}</>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              );
            })}
          </div>
        </>
      ) : (
        <div>None.</div>
      )}
    </div>
  );
}
