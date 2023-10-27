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
import style from "../styles/detachmentPage.module.scss";
import classnames from "classnames";

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
    <div className={style.detachmentPageWrapper}>
      {data ? (
        <div className={style.detachmentPage}>
          <h1>{data.detachment.data.attributes.display_name}</h1>
          <section className={style.enhancementsWrapper}>
            <h2>Enhancements</h2>
            <div className={style.enhancementList}>
              {data.detachment.data.attributes.enhancements.data.map(
                (enhancement, i) => (
                  <div className={style.enhancement} key={"enhancement" + i}>
                    {enhancement.attributes.display_name}:{" "}
                    <ReactMarkdown>
                      {enhancement.attributes.description}
                    </ReactMarkdown>
                  </div>
                )
              )}
            </div>
          </section>
          <section className={style.stratagemsWrapper}>
            <h2>Stratagems</h2>
            <div className={style.stratagemList}>
              {data.detachment.data.attributes.stratagem_bundle.data.attributes.stratagem.map(
                (stratagem, i) => (
                  <div className={style.stratagem} key={"stratagem" + i}>
                    <div className={style.stratagemInfoArea}>
                      <b>{stratagem.display_name}</b>{" "}
                      <div className={style.stratagemCost}>
                        [Cost: {stratagem.cost}CP]
                      </div>
                    </div>
                    <div className={style.stratagemInfoArea}>
                      <b>When:</b>{" "}
                      <ReactMarkdown>{stratagem.when}</ReactMarkdown>
                    </div>
                    <div className={style.stratagemInfoArea}>
                      <b>Target:</b>{" "}
                      <ReactMarkdown>{stratagem.target}</ReactMarkdown>
                    </div>
                    <div className={style.stratagemInfoArea}>
                      <b>Effect:</b>{" "}
                      <ReactMarkdown>{stratagem.effect}</ReactMarkdown>
                    </div>
                    {stratagem.restrictions ? (
                      <div className={style.stratagemInfoArea}>
                        <b>Restrictions:</b>{" "}
                        <ReactMarkdown>{stratagem.restrictions}</ReactMarkdown>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                )
              )}
            </div>
          </section>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
