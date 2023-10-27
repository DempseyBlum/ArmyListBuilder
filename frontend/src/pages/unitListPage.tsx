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
import style from "../styles/unitListPage.module.scss";

export default function UnitListPage() {
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
    <div className={style.unitListPageWrapper}>
      {data && factionData ? (
        <>
          <h1>{factionData.faction.data.attributes.display_name}</h1>
          <section className={style.unitsListWrapper}>
            <h2 className={style.unitSectionTitle}>Units</h2>
            {data.unitDatasheets.data.map((unit, i) => (
              <Link to={"/faction/" + contentId + "/unit/" + unit.id}>
                <div className={style.unitTile} key={"unit" + i}>
                  {unit.attributes.display_name}
                </div>
              </Link>
            ))}
          </section>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
