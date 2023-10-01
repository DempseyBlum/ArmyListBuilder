import React, { useEffect, useState } from "react";
import { useStrapiQuery } from "../../hooks/useStrapiQuery";
import { titleCreator } from "../../utils/titleCreator";
import { Link, useParams } from "react-router-dom";
import { OperationVariables } from "@apollo/client";
import {
  DatasheetsReturnType,
  SimplifiedOption,
  SingleDatasheetReturnType,
  DatasheetWargear,
  DatasheetWeapon,
  datasheetByIDQuery,
  factionDatasheetsQuery,
  WargearOption,
  GearChoice,
} from "../../queries/datasheetQueries";
import style from "../styles/datasheetPage.module.scss";

type Stats = {
  Name: String;
  M: number;
  T: number;
  SV: number;
  W: number;
  LD: number;
  OC: number;
  INVUL: number;
};

type RangedWeapon = {
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

type MeleeWeapon = {
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

type Wargear = {
  id: string;
  Name: string;
  Ability: string;
};

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

export default function DatasheetListPage() {
  useEffect(() => {
    document.title = titleCreator("Datasheet List");
  }, []);

  const { contentId, unitId } = useParams();

  const {
    loading,
    error,
    data,
  }: {
    loading: boolean;
    error?: any;
    data: SingleDatasheetReturnType | undefined;
  } = useStrapiQuery(datasheetByIDQuery, {
    variables: {
      datasheetID: unitId,
    },
  } as OperationVariables);

  const [stats, setStats] = useState<Stats[]>([]);
  const [rangedWeapons, setRangedWeapons] = useState<RangedWeapon[]>([]);
  const [meleeWeapons, setMeleeWeapons] = useState<MeleeWeapon[]>([]);
  const [wargearList, setWargearList] = useState<Wargear[]>([]);

  useEffect(() => {
    if (!data) {
      return;
    }
    // Get all the stats
    let newStats = [...stats];

    data.unitDatasheet.data.attributes.unit_composition_options.map(
      (unitOption) => {
        unitOption.models_in_unit.map((model) => {
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
              } else if (
                statline.LD !== model.model.data.attributes.leadership
              ) {
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
      }
    );
    setStats([...newStats]);

    // Get all the weapons and wargear
    let newRanged = [...rangedWeapons];
    let newMelee = [...meleeWeapons];
    let newWargear = [...wargearList];

    data.unitDatasheet.data.attributes.unit_composition_options.map(
      (unitOption) => {
        unitOption.models_in_unit.map((models_in_unit) => {
          models_in_unit.model.data.attributes.default_wargear.map((gear) => {
            if (isWargear(gear)) {
              // Check if id of wargear already exists in newWargear
              let check = false;
              newWargear.forEach((wargear) => {
                if (wargear.id === gear.wargear.data.id) {
                  check = true;
                }
              });
              if (check === false) {
                if (newWargear.length === 0) {
                  newWargear.push({
                    id: gear.wargear.data.id,
                    Name: gear.wargear.data.attributes.display_name,
                    Ability: gear.wargear.data.attributes.ability,
                  });
                }
              }
            } else if (isWeapon(gear)) {
              // Check if id of wargear already exists in newWargear
              let check = false;
              newRanged.forEach((weapon) => {
                if (weapon.id === gear.weapon.data.id) {
                  check = true;
                }
              });
              if (
                check == false &&
                gear.weapon.data.attributes.ranged_weapon_stats.length > 0
              ) {
                gear.weapon.data.attributes.ranged_weapon_stats.map(
                  (weapon) => {
                    let keywords = [];
                    weapon.weapon_keywords.data.map((keyword) => {
                      keywords.push(keyword.attributes.display_name);
                    });

                    newRanged.push({
                      id: gear.weapon.data.id,
                      Name:
                        weapon.display_name_override ??
                        gear.weapon.data.attributes.display_name,
                      Keywords: keywords,
                      Range: weapon.range + `"`,
                      A: weapon.attacks,
                      BS: weapon.skill + "+",
                      S: weapon.strength,
                      AP: "-" + weapon.penetration,
                      D: weapon.damage,
                    });
                  }
                );
              }

              check = false;

              newMelee.forEach((weapon) => {
                if (weapon.id === gear.weapon.data.id) {
                  check = true;
                }
              });

              if (
                check == false &&
                gear.weapon.data.attributes.melee_weapon_stats.length > 0
              ) {
                gear.weapon.data.attributes.melee_weapon_stats.map((weapon) => {
                  let keywords = [];
                  weapon.weapon_keywords.data.map((keyword) => {
                    keywords.push(keyword.attributes.display_name);
                  });

                  newMelee.push({
                    id: gear.weapon.data.id,
                    Name:
                      weapon.display_name_override ??
                      gear.weapon.data.attributes.display_name,
                    Keywords: keywords,
                    Range: "Melee",
                    A: weapon.attacks,
                    WS: weapon.skill + "+",
                    S: weapon.strength,
                    AP: "-" + weapon.penetration,
                    D: weapon.damage,
                  });
                });
              }
            }
          });
        });
      }
    );
    setRangedWeapons([...newRanged]);
    setMeleeWeapons([...newMelee]);
    setWargearList([...newWargear]);
  }, [data]);

  // Need a good way to get all the stats of every model possible in the unit. Then display only the ones that have different stats.
  // I also need a way to get all the weapon options, this includes default weapons from each model, and the weapon options for the datasheet.
  //Make a 2d array and map the results.

  // function GetWargearOptionNames(
  //   weaponOptions: SimplifiedOption[],
  //   wargearOption: SimplifiedOption[]
  // ) {
  //   let names = [];
  //   weaponOptions.map((option) => {
  //     names.push(option.attributes.display_name);
  //   });
  //   wargearOption.map((option) => {
  //     names.push(option.attributes.display_name);
  //   });
  //   return names;
  // }

  // function GetAllModelNames(
  //   models: {
  //     id: string;
  //     attributes: {
  //       display_name: string;
  //     };
  //   }[]
  // ) {
  //   let names = [];
  //   models.map((model) => {
  //     names.push(model.attributes.display_name);
  //   });

  //   const missing = CheckForMissingModelNames(names);

  //   if (missing.length > 0) {
  //     return names;
  //   }
  //   return ["models"];
  // }

  function CheckForMissingModelNames(names: string[]) {
    let missingNames = [];
    data.unitDatasheet.data.attributes.unit_composition_options.map(
      (unitOption) => {
        unitOption.models_in_unit.map((model) => {
          if (!names.includes(model.model.data.attributes.display_name)) {
            missingNames.push(model);
          }
        });
      }
    );
    return missingNames;
  }

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

    return (
      <>
        {allGear.length > 0
          ? allGear.map((gear, t) => (
              <>
                {(t === 0 ? "" : t === allGear.length - 1 ? " and " : ", ") +
                  gear.name}
              </>
            ))
          : ""}
      </>
    );
  }

  function GetNewGearString(option: WargearOption) {
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

    return (
      <>
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
      </>
    );
  }

  function GetEquipString(option: WargearOption) {
    return (
      <>
        {" "}
        {option.how_many_models_can_take === null
          ? "Any number of models "
          : option.how_many_models_can_take === 1
          ? "1 model"
          : "Up to " + option.how_many_models_can_take + " models"}
        can be equipped with {GetNewGearString(option)}."
      </>
    );
  }

  function GetEquipStringWithGearChoices(option: WargearOption) {
    return (
      <>
        {" "}
        {option.how_many_models_can_take === null
          ? "Any number of models "
          : option.how_many_models_can_take === 1
          ? "1 model"
          : "Up to " + option.how_many_models_can_take + " models"}
        can be equipped with
        {option.how_many_options_can_be_picked === 1
          ? "one of the following:"
          : "any number of the following" +
            (option.allow_duplicates
              ? ", and can take duplicates:"
              : ". You cannot take duplicates:")}
      </>
    );
  }

  function GetReplacementString(option: WargearOption) {
    return (
      <>
        {option.how_many_models_can_take === null
          ? "Any number of models "
          : option.how_many_models_can_take === 1
          ? "1 model's "
          : "Up to " +
            option.how_many_models_can_take +
            " models can each have their"}
        {GetReplacedGearString(option)} replaced with {GetNewGearString(option)}
        ."
      </>
    );
  }

  function GetReplacementStringWithGearChoices(option: WargearOption) {
    return (
      <>
        {option.how_many_models_can_take === null
          ? "Any number of models "
          : option.how_many_models_can_take === 1
          ? "1 model "
          : "Up to " + option.how_many_models_can_take + " models"}
        can each have their {GetReplacedGearString(option)} replaced with
        {option.how_many_options_can_be_picked === 1
          ? " one of the following:"
          : " any number of the following" +
            (option.allow_duplicates
              ? ", and can take duplicates:"
              : ", and you cannot take duplicates:")}
      </>
    );
  }

  return (
    <div>
      {data ? (
        <>
          <Link to={"/faction/" + contentId + "/faction_datasheets/"}>
            <button>{"< "}Back</button>
          </Link>
          <h1>{data.unitDatasheet.data.attributes.display_name}</h1>
          <h2>Keywords</h2>
          <ul>
            {data.unitDatasheet.data.attributes.core_keywords.data.map(
              (keyword, i) => (
                <li key={"keyword" + i}>{keyword.attributes.display_name}</li>
              )
            )}
          </ul>
          <h2>Unit Keywords</h2>
          <ul>
            {data.unitDatasheet.data.attributes.unit_keywords.data.map(
              (keyword, i) => (
                <li key={"keyword" + i}>{keyword.attributes.display_name}</li>
              )
            )}
          </ul>
          <h2>Faction Ability</h2>
          <ul>
            {data.unitDatasheet.data.attributes.has_faction_ability ? (
              <li>
                {
                  data.unitDatasheet.data.attributes.faction.data.attributes
                    .ruleName
                }
              </li>
            ) : (
              <div>None</div>
            )}
          </ul>
          <h2>Abilities</h2>
          <ul>
            {data.unitDatasheet.data.attributes.abilities.map((ability, i) => (
              <li key={"ability" + i}>
                {ability.name}: {ability.description}
              </li>
            ))}
          </ul>
          <h2>Stats</h2>
          <div>
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
          <h2>Weapons</h2>
          <div>
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
          <h2>Wargear Options</h2>
          {data.unitDatasheet.data.attributes.wargear_options ? (
            <>
              <div className={style.wargrearOptions}>
                {data.unitDatasheet.data.attributes.wargear_options.map(
                  (option, i) => {
                    console.log("test: ", option.weapons_to_lose);
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
                          <div className={style.option}>
                            {GetEquipString(option)}
                          </div>
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
                  }
                )}
              </div>
            </>
          ) : (
            <div>None.</div>
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
