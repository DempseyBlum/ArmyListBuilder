import React, { useCallback, useEffect, useState } from "react";
import {
  AllDetachmentsReturnType,
  allDatachmentsQuery,
} from "../../queries/detachmentQueries";
import { useStrapiQuery } from "../../hooks/useStrapiQuery";
import {
  AllFactionsReturnType,
  allFactionsQuery,
} from "../../queries/factionQueries";
import { Link } from "react-router-dom";
import { OperationVariables } from "@apollo/client";
import { titleCreator } from "../../utils/titleCreator";
import style from "../styles/homePage.module.scss";
// Not being used, but decent format for pagination in the future.
interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}

export default function HomePage() {
  useEffect(() => {
    document.title = titleCreator("Homepage");
  }, []);
  const token = process.env.PUBLIC_STRAPI_API_TOKEN; // Auth not used yet.

  const {
    loading,
    error,
    data,
  }: {
    loading: boolean;
    error?: any;
    data: AllFactionsReturnType | undefined;
  } = useStrapiQuery(allFactionsQuery, {
    variables: {},
  } as OperationVariables);

  return (
    <div className={style.homePageWrapper}>
      <section className={style.factionsWrapper}>
        <h2 className={style.factionSectionTitle}>Factions</h2>
        {data ? (
          data.factions.data.map((faction, i) => (
            <Link to={"/faction/" + faction.id}>
              <div className={style.factionTile} key={faction.id.toString()}>
                <h3 className={style.factionName}>
                  {faction.attributes.display_name}
                </h3>
                <Link to={"/faction/" + faction.id + "/faction_datasheets"}>
                  <button className={style.unitsButton}>UNITS</button>
                </Link>
              </div>
            </Link>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </section>
    </div>
  );
}
