import React, { useEffect, useState } from "react";
import { useStrapiQuery } from "../../hooks/useStrapiQuery";
import { titleCreator } from "../../utils/titleCreator";
import {
  FactionReturnType,
  factionByIDQuery,
} from "../../queries/factionQueries";
import { Link, useParams } from "react-router-dom";
import { OperationVariables } from "@apollo/client";
import {
  DatasheetsReturnType,
  SingleDatasheetReturnType,
  WargearOption,
  WeaponOption,
  datasheetByIDQuery,
  factionDatasheetsQuery,
} from "../../queries/datasheetQueries";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { StringValueNode } from "graphql";
import { Weapon } from "../../queries/equipmentQueries";

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
  component: WeaponOption | WargearOption
): component is WargearOption {
  return (component as WargearOption).wargear !== undefined;
}

function isWeapon(
  component: WeaponOption | WargearOption
): component is WeaponOption {
  return (component as WeaponOption).weapon !== undefined;
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
  const [wargear, setWargear] = useState<Wargear[]>([]);

  useEffect(() => {
    if (!data) {
      return;
    }
    // Get all the stats
    let newStats = [...stats];

    data.unitDatasheet.data.attributes.unit_composition_options.map(
      (unitOption) => {
        console.log("TEST: ", unitOption);
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
    let newWargear = [...wargear];

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
    setWargear([...newWargear]);

    console.log("stats:", newStats);
    console.log("ranged:", newRanged);
    console.log("melee:", newMelee);
    console.log("wargear:", newWargear);
  }, [data]);

  // Need a good way to get all the stats of every model possible in the unit. Then display only the ones that have different stats.
  // I also need a way to get all the weapon options, this includes default weapons from each model, and the weapon options for the datasheet.
  //Make a 2d array and map the results.

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
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
