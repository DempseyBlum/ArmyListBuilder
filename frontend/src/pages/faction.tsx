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

  return (
    <div>
      {data ? (
        <>
          <Link to={"/"}>
            <button>{"< "}Back</button>
          </Link>
          <h1>{data.faction.data.attributes.display_name}</h1>
          <h2>Rules</h2>
          <ul>
            <li>
              <b>{data.faction.data.attributes.ruleName}: </b>{" "}
              {data.faction.data.attributes.ruleDescription}
            </li>
            {data.faction.data.attributes.extraRuleName !== "" && (
              <li>
                <b>{data.faction.data.attributes.extraRuleName}: </b>{" "}
                {data.faction.data.attributes.extraRuleDescription}
              </li>
            )}
          </ul>
          <h2>Detachments</h2>
          <ul>
            {data.faction.data.attributes.detachments.data.map(
              (detachment, i) => (
                <Link to={"/detachment/" + detachment.id}>
                  <li key={"detachment" + i}>
                    {detachment.attributes.display_name}
                  </li>
                </Link>
              )
            )}
          </ul>
          <Link to={"faction_datasheets/"}>
            <button>See Units</button>
          </Link>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
