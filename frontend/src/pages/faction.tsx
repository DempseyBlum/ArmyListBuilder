import React, { useEffect } from "react";
import { useStrapiQuery } from "../../hooks/useStrapiQuery";
import { titleCreator } from "../../utils/titleCreator";
import {
  FactionReturnType,
  factionByIDQuery,
} from "../../queries/factionQueries";
import { Link, useParams } from "react-router-dom";
import { OperationVariables } from "@apollo/client";

export default function FactionPage() {
  useEffect(() => {
    document.title = titleCreator("Faction");
  }, []);

  const { contentId } = useParams();

  const {
    loading,
    error,
    data,
  }: {
    loading: boolean;
    error?: any;
    data: FactionReturnType | undefined;
  } = useStrapiQuery(factionByIDQuery, {
    variables: {
      factionID: contentId,
    },
  } as OperationVariables);

  console.log("loading: ", loading);
  console.log("error: ", error);
  console.log("data: ", data);

  return (
    <div>
      {data ? (
        <>
          <Link to={"/"}>
            <button>{"< "}Back</button>
          </Link>
          <h1>{data.faction.data.attributes.display_name}</h1>
          <h2>Detachments</h2>
          <ul>
            {data.faction.data.attributes.detachments.data.map((detachment) => (
              <Link to={"/detachment/" + detachment.id}>
                <li key="{detachment}">{detachment.attributes.display_name}</li>
              </Link>
            ))}
          </ul>
        </>
      ) : (
        <div>Couldn't find data</div>
      )}
    </div>
  );
}
