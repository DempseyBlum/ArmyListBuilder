import React, { useEffect } from "react";
import { useStrapiQuery } from "../../hooks/useStrapiQuery";
import { titleCreator } from "../../utils/titleCreator";
import {
  FactionReturnType,
  factionByIDQuery,
} from "../../queries/factionQueries";
import { Link, useParams } from "react-router-dom";
import {
  SingleDetachmentReturnType,
  detachmentByIDQuery,
} from "../../queries/detachmentQueries";
import { OperationVariables } from "@apollo/client";

export default function DetachmentPage() {
  useEffect(() => {
    document.title = titleCreator("Detachment");
  }, []);
  const { contentId } = useParams();

  const {
    loading,
    error,
    data,
  }: {
    loading: boolean;
    error?: any;
    data: SingleDetachmentReturnType | undefined;
  } = useStrapiQuery(detachmentByIDQuery, {
    variables: {
      detachmentID: contentId,
    },
  } as OperationVariables);

  return (
    <div>
      {data ? (
        <>
          <Link
            to={"/faction/" + data.detachment.data.attributes.faction.data.id}
          >
            <button>{"< "}Back</button>
          </Link>
          <h1>{data.detachment.data.attributes.display_name}</h1>
          <h2>Enhancements</h2>
          <ul>
            {data.detachment.data.attributes.enhancements.data.map(
              (enhancement) => (
                <li key="{enhancement}">
                  {enhancement.attributes.display_name}
                </li>
              )
            )}
          </ul>
          <h2>Stratagems</h2>
          <ul>
            {data.detachment.data.attributes.stratagem_bundle.data.attributes.stratagem.map(
              (enhancement) => (
                <li key="{enhancement}">{enhancement.display_name}</li>
              )
            )}
          </ul>
        </>
      ) : (
        <div>Couldn't find data</div>
      )}
    </div>
  );
}
