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
// Not being used, but decent format for pagination in the future.
interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}

export default function HomePage() {
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
  });

  return (
    <div>
      <ul>
        {data ? (
          data.factions.data.map((detachment) => (
            <li key="{detachment}">{detachment.attributes.display_name}</li>
          ))
        ) : (
          <div>Couldn't find data</div>
        )}
      </ul>
    </div>
  );
}
