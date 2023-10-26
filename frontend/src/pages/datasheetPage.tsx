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
import StatlineTable, {
  Stats,
} from "../components/statlineTable/statlineTable";
import WeaponTable, {
  MeleeWeapon,
  RangedWeapon,
} from "../components/weaponTable/weaponTable";
import WargearOptions from "../components/wargearOptions/wargearOptions";
import UnitComposition from "../components/unitComposition/unitComposition";

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

  type Wargear = {
    id: string;
    name: string;
    ability: string;
  };

  const [rangedWeapons, setRangedWeapons] = useState<RangedWeapon[]>([]);
  const [meleeWeapons, setMeleeWeapons] = useState<MeleeWeapon[]>([]);
  const [wargearList, setWargearList] = useState<Wargear[]>([]);

  useEffect(() => {
    if (!data) {
      return;
    }

    // Get all the weapons and wargear
    let newRanged = [...rangedWeapons];
    let newMelee = [...meleeWeapons];
    let newWargear = [...wargearList];

    // Add all the gear in wargear options to weapon / wargear list
    data.unitDatasheet.data.attributes.wargear_options.map((wargearOption) => {
      wargearOption.gear_choices.map((gearChoice) => {
        gearChoice.wargear_to_gain.map((wargearChoice) => {
          const wargear = wargearChoice.wargear.data;

          let check = false;
          newWargear.forEach((existingWargear) => {
            if (existingWargear.id === wargear.id) {
              check = true;
            }
          });

          if (!check) {
            newWargear.push({
              id: wargear.id,
              name: wargear.attributes.display_name,
              ability: wargear.attributes.ability,
            });
          }
        });

        gearChoice.weapons_to_gain.map((weaponChoice) => {
          const weapon = weaponChoice.weapon.data;
          // Check if id of wargear already exists in newWargear
          let check = false;
          newRanged.forEach((ranged) => {
            if (ranged.id === weapon.id) {
              check = true;
            }
          });
          if (
            check == false &&
            weapon.attributes.ranged_weapon_stats.length > 0
          ) {
            weapon.attributes.ranged_weapon_stats.map((rangedWeapon) => {
              let keywords = [];
              rangedWeapon.weapon_keywords.data.map((keyword) => {
                keywords.push(keyword.attributes.display_name);
              });

              newRanged.push({
                id: weapon.id,
                Name:
                  rangedWeapon.display_name_override ??
                  weapon.attributes.display_name,
                Keywords: keywords,
                Range: rangedWeapon.range + `"`,
                A: rangedWeapon.attacks,
                BS: rangedWeapon.skill + "+",
                S: rangedWeapon.strength,
                AP: "-" + rangedWeapon.penetration,
                D: rangedWeapon.damage,
              });
            });
          }

          check = false;

          newMelee.forEach((melee) => {
            if (melee.id === weapon.id) {
              check = true;
            }
          });

          if (
            check == false &&
            weapon.attributes.melee_weapon_stats.length > 0
          ) {
            weapon.attributes.melee_weapon_stats.map((meleeWeapon) => {
              let keywords = [];
              meleeWeapon.weapon_keywords.data.map((keyword) => {
                keywords.push(keyword.attributes.display_name);
              });

              newMelee.push({
                id: weapon.id,
                Name:
                  meleeWeapon.display_name_override ??
                  weapon.attributes.display_name,
                Keywords: keywords,
                Range: "Melee",
                A: meleeWeapon.attacks,
                WS: meleeWeapon.skill + "+",
                S: meleeWeapon.strength,
                AP: "-" + meleeWeapon.penetration,
                D: meleeWeapon.damage,
              });
            });
          }
        });
      });
    });

    // Add all model's default weapons to weapon list.
    data.unitDatasheet.data.attributes.unit_composition.map(
      (models_in_unit) => {
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
              newWargear.push({
                id: gear.wargear.data.id,
                name: gear.wargear.data.attributes.display_name,
                ability: gear.wargear.data.attributes.ability,
              });
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
              gear.weapon.data.attributes.ranged_weapon_stats.map((weapon) => {
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
              });
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
      }
    );
    setRangedWeapons([...newRanged]);
    setMeleeWeapons([...newMelee]);
    setWargearList([...newWargear]);
  }, [data]);

  return (
    <div>
      {data ? (
        <>
          <Link to={"/faction/" + contentId + "/faction_datasheets/"}>
            <button>{"< "}Back</button>
          </Link>
          <h1>{data.unitDatasheet.data.attributes.display_name}</h1>
          <h2>Abilities</h2>
          <div>
            CORE:{" "}
            {data.unitDatasheet.data.attributes.core_keywords.data.map(
              (keyword, i, array) => (
                <b key={"keyword" + i}>
                  {keyword.attributes.display_name}
                  {i < array.length - 1 ? ", " : ""}
                </b>
              )
            )}
          </div>
          <div>
            FACTION:{" "}
            {data.unitDatasheet.data.attributes.has_faction_ability && (
              <b>
                {
                  data.unitDatasheet.data.attributes.faction.data.attributes
                    .ruleName
                }
              </b>
            )}
            {data.unitDatasheet.data.attributes.has_faction_ability &&
            data.unitDatasheet.data.attributes.has_extra_faction_ability &&
            data.unitDatasheet.data.attributes.faction.data.attributes
              .extraRuleName !== ""
              ? ", "
              : ""}
            {data.unitDatasheet.data.attributes.has_extra_faction_ability && (
              <b>
                {
                  data.unitDatasheet.data.attributes.faction.data.attributes
                    .extraRuleName
                }
              </b>
            )}
          </div>
          <ul>
            {data.unitDatasheet.data.attributes.abilities.map((ability, i) => (
              <li key={"ability" + i}>
                <b>{ability.name}:</b> {ability.description}
              </li>
            ))}
          </ul>
          <h2>Wargear Abilities</h2>
          <ul>
            {wargearList.map((wargear, i) => (
              <li key={"wargear" + i}>
                <b>{wargear.name}:</b> {wargear.ability}
              </li>
            ))}
          </ul>
          <h2>Stats</h2>
          <StatlineTable unitDatasheet={data.unitDatasheet.data} />
          <h2>Weapons</h2>
          <WeaponTable
            rangedWeapons={rangedWeapons}
            meleeWeapons={meleeWeapons}
          />
          <h2>Wargear Options</h2>
          <WargearOptions unitDatasheet={data.unitDatasheet.data} />
          <h2>Unit Composition</h2>
          <UnitComposition unitDatasheet={data.unitDatasheet.data} />
          <h2>Unit Keywords</h2>
          <ul>
            {data.unitDatasheet.data.attributes.unit_keywords.data.map(
              (keyword, i) => (
                <li key={"keyword" + i}>{keyword.attributes.display_name}</li>
              )
            )}
          </ul>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
