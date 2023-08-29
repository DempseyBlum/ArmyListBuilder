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

type Stats = {
  Name: String;
  M: number;
  T: number;
  SV: number;
  W: number;
  LD: number;
  OC: number;
};

type RangedWeapon = {
  Name: string;
  Range: string;
  A: number;
  BS: string;
  S: number;
  AP: number;
  D: string;
};

type MeleeWeapon = {
  Name: string;
  Range: string;
  A: number;
  WS: string;
  S: number;
  AP: number;
  D: string;
};

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
                {data.unitDatasheet.data.attributes.unit_composition_options.map(
                  (model) => {
                    return (
                      <tr>
                        <td>{model.model[0].model.data.attributes.movement}</td>
                        <td>
                          {model.model[0].model.data.attributes.toughness}
                        </td>
                        <td>{model.model[0].model.data.attributes.save}</td>
                        <td>{model.model[0].model.data.attributes.wounds}</td>
                        <td>
                          {model.model[0].model.data.attributes.leadership}
                        </td>
                        <td>
                          {
                            model.model[0].model.data.attributes
                              .objective_control
                          }
                        </td>
                        <td>
                          {model.model[0].model.data.attributes.invul_save}
                        </td>
                      </tr>
                    );
                  }
                )}
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
                <tr>
                  <td>Test Name</td>
                  <td>5"</td>
                  <td>5</td>
                  <td>5</td>
                  <td>5</td>
                  <td>5</td>
                  <td>5</td>
                </tr>
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
                <tr>
                  <td>Test Name</td>
                  <td>Melee</td>
                  <td>5</td>
                  <td>5</td>
                  <td>5</td>
                  <td>5</td>
                  <td>5</td>
                </tr>
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
