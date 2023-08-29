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
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

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
              (enhancement, i) => (
                <li key={"enhancement" + i}>
                  {enhancement.attributes.display_name}:{" "}
                  <ReactMarkdown>
                    {enhancement.attributes.description}
                  </ReactMarkdown>
                </li>
              )
            )}
          </ul>
          <h2>Stratagems</h2>
          <ul>
            {data.detachment.data.attributes.stratagem_bundle.data.attributes.stratagem.map(
              (stratagem, i) => (
                <li key={"stratagem" + i}>
                  {stratagem.display_name} [Cost: {stratagem.cost}CP]
                  <div>
                    When: <ReactMarkdown>{stratagem.when}</ReactMarkdown>
                  </div>
                  <div>
                    Target: <ReactMarkdown>{stratagem.target}</ReactMarkdown>
                  </div>
                  <div>
                    Effect:<ReactMarkdown>{stratagem.effect}</ReactMarkdown>{" "}
                  </div>
                  {stratagem.restrictions ? (
                    <div>
                      Restrictions:{" "}
                      <ReactMarkdown>{stratagem.restrictions}</ReactMarkdown>{" "}
                    </div>
                  ) : (
                    <></>
                  )}
                </li>
              )
            )}
          </ul>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
