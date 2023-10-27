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
  RangedWeapon,
} from "../components/weaponTables/rangedWeaponTable";
import WargearOptions from "../components/wargearOptions/wargearOptions";
import UnitComposition from "../components/unitComposition/unitComposition";
import ReactMarkdown from "react-markdown";
import RangedWeaponTable from "../components/weaponTables/rangedWeaponTable";
import MeleeWeaponTable, {
  MeleeWeapon,
} from "../components/weaponTables/meleeWeaponTable";
import classnames from "classnames";

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
    <div className={style.datasheetWrapper}>
      {data ? (
        <div className={style.datasheet}>
          {/* Top half of datacard */}
          <div className={classnames(style.unitCard, style.unitCardTop)}>
            <section
              className={classnames(style.cardHeader, style.statlineHeader)}
            >
              <h2>{data.unitDatasheet.data.attributes.display_name}</h2>
              <StatlineTable unitDatasheet={data.unitDatasheet.data} />
            </section>
            <div className={style.cardBody}>
              <div className={style.mainBody}>
                <section
                  className={classnames(style.rangedWeapons, style.weaponTable)}
                >
                  <h3>RANGED WEAPONS</h3>
                  <RangedWeaponTable weapons={rangedWeapons} />
                </section>
                <section
                  className={classnames(style.meleeWeapons, style.weaponTable)}
                >
                  <h3>MELEE WEAPONS</h3>
                  <MeleeWeaponTable weapons={meleeWeapons} />
                </section>
              </div>
              <div className={style.sideBody}>
                <section
                  className={classnames(style.abilities, style.unitAbilities)}
                >
                  <h3>ABILITIES</h3>
                  <div className={style.abilitySubArea}>
                    <h4>CORE: </h4>
                    {data.unitDatasheet.data.attributes.core_keywords.data.map(
                      (keyword, i, array) => (
                        <b key={"keyword" + i}>
                          {keyword.attributes.display_name}
                          {i < array.length - 1 ? ", " : ""}
                        </b>
                      )
                    )}
                  </div>
                  <div className={style.abilitySubArea}>
                    <h4>FACTION: </h4>
                    {data.unitDatasheet.data.attributes.has_faction_ability && (
                      <b>
                        {
                          data.unitDatasheet.data.attributes.faction.data
                            .attributes.ruleName
                        }
                      </b>
                    )}
                    {data.unitDatasheet.data.attributes.has_faction_ability &&
                    data.unitDatasheet.data.attributes
                      .has_extra_faction_ability &&
                    data.unitDatasheet.data.attributes.faction.data.attributes
                      .extraRuleName !== ""
                      ? ", "
                      : ""}
                    {data.unitDatasheet.data.attributes
                      .has_extra_faction_ability && (
                      <b>
                        {
                          data.unitDatasheet.data.attributes.faction.data
                            .attributes.extraRuleName
                        }
                      </b>
                    )}
                  </div>
                  <div className={style.unitAbilitiesWrapper}>
                    {data.unitDatasheet.data.attributes.abilities.map(
                      (ability, i) => (
                        <div className={style.unitAbility} key={"ability" + i}>
                          <b>{ability.name}:</b> {ability.description}
                        </div>
                      )
                    )}
                  </div>
                </section>
                <section
                  className={classnames(
                    style.abilities,
                    style.wargearAbilities
                  )}
                >
                  <h3>WARGEAR ABILITIES</h3>
                  <ul>
                    {wargearList.map((wargear, i) => (
                      <li key={"wargear" + i}>
                        <b>{wargear.name}:</b> {wargear.ability}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </div>
          {/* Bottom half of datacard */}
          <div className={classnames(style.unitCard, style.unitCardBottom)}>
            <div className={style.cardBody}>
              <div className={classnames(style.mainBody, style.wargearOptions)}>
                <h3>Wargear Options</h3>
                <WargearOptions unitDatasheet={data.unitDatasheet.data} />
              </div>
              <div className={style.sideBody}>
                <h3>Unit Composition</h3>
                <UnitComposition unitDatasheet={data.unitDatasheet.data} />
              </div>
            </div>
            <div className={style.keywordsFooter}>
              <section className={style.unitKeywords}>
                <h3>KEYWORDS:</h3>
                {data.unitDatasheet.data.attributes.unit_keywords.data.map(
                  (keyword, i, array) => (
                    <b className={style.keyword} key={"keyword" + i}>
                      {keyword.attributes.display_name}
                      {i < array.length - 1 ? ", " : ""}
                    </b>
                  )
                )}
              </section>
              <section className={style.factionKeywordsWrapper}>
                <div className={style.factionIcon}>ICON</div>
                <div className={style.factionKeywords}>
                  <h3>FACTION KEYWORDS</h3>
                  TODO
                </div>
              </section>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
