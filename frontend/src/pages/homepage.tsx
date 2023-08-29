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
    <div>
      <h1>Home Page</h1>
      <h2>Factions</h2>
      <ul>
        {data ? (
          data.factions.data.map((faction, i) => (
            <Link to={"/faction/" + faction.id}>
              <li key={faction.id.toString()}>
                {faction.attributes.display_name}
              </li>
            </Link>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </ul>
    </div>
  );
}
