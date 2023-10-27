import React, { useEffect } from "react";
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
  factionDatasheetsQuery,
} from "../../queries/datasheetQueries";

export default function DatasheetListPage() {
  useEffect(() => {
    document.title = titleCreator("Datasheet List");
  }, []);

  const { contentId } = useParams();

  const {
    loading,
    error,
    data,
  }: {
    loading: boolean;
    error?: any;
    data: DatasheetsReturnType | undefined;
  } = useStrapiQuery(factionDatasheetsQuery, {
    variables: {
      factionID: contentId,
    },
  } as OperationVariables);

  const {
    loading: factionLoadingq,
    error: factionError,
    data: factionData,
  }: {
    loading: boolean;
    error?: any;
    data: FactionReturnType | undefined;
  } = useStrapiQuery(factionByIDQuery, {
    variables: {
      factionID: contentId,
    },
  } as OperationVariables);

  return (
    <div>
      {data && factionData ? (
        <>
          <h1>{factionData.faction.data.attributes.display_name}</h1>
          <h2>Units</h2>
          <ul>
            {data.unitDatasheets.data.map((unit, i) => (
              <Link to={"/faction/" + contentId + "/unit/" + unit.id}>
                <div key={"unit" + i}>{unit.attributes.display_name}</div>
              </Link>
            ))}
          </ul>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
