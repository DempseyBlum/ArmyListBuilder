import React, { useCallback, useEffect, useState } from "react";
import {
  DetachmentsReturnType,
  allDatachmentsQuery,
} from "../../queries/detachmentQueries";
import { useStrapiQuery } from "../../hooks/useStrapiQuery";
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
    data: DetachmentsReturnType | undefined;
  } = useStrapiQuery(allDatachmentsQuery, {
    variables: {},
  });

  return (
    <div>
      <ul>
        {data ? (
          data.detachments.data.map((detachment) => (
            <li key="{detachment}">{detachment.attributes.name}</li>
          ))
        ) : (
          <div>Couldn't find data</div>
        )}
      </ul>
    </div>
  );
}
