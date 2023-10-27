import React, { useEffect } from "react";
import { useStrapiQuery } from "../../hooks/useStrapiQuery";
import { titleCreator } from "../../utils/titleCreator";
import {
  FactionReturnType,
  factionByIDQuery,
} from "../../queries/factionQueries";
import { Link, useParams } from "react-router-dom";
import { OperationVariables } from "@apollo/client";
import style from "../styles/factionPage.module.scss";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

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
    <div className={style.factionPageWrapper}>
      {data ? (
        <>
          <div className={style.titleWrapper}>
            <h1 className={style.factionTitle}>
              {data.faction.data.attributes.display_name}
            </h1>
            <Link to={"faction_datasheets/"}>
              <button className={style.seeUnitsButton}>See Units</button>
            </Link>
          </div>
          <section className={style.rulesWrapper}>
            <h2 className={style.sectionTitle}>Rules</h2>
            <div className={style.rules}>
              <div className={style.ruleDetails}>
                <b>{data.faction.data.attributes.ruleName}: </b>{" "}
                <ReactMarkdown>
                  {data.faction.data.attributes.ruleDescription}
                </ReactMarkdown>
              </div>
              {data.faction.data.attributes.extraRuleName !== "" && (
                <div className={style.extraRuleDetails}>
                  <b>{data.faction.data.attributes.extraRuleName}: </b>{" "}
                  {data.faction.data.attributes.extraRuleDescription}
                </div>
              )}
            </div>
          </section>
          <section className={style.detachmentsWrapper}>
            <h2 className={style.sectionTitle}>Detachments</h2>
            <div className={style.detachments}>
              {data.faction.data.attributes.detachments.data.map(
                (detachment, i) => (
                  <Link to={"/detachment/" + detachment.id}>
                    <div
                      className={style.detachmentTile}
                      key={"detachment" + i}
                    >
                      <h3 className={style.detachmentName}>
                        {detachment.attributes.display_name}
                      </h3>
                    </div>
                  </Link>
                )
              )}
            </div>
          </section>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
