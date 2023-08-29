import { gql } from "@apollo/client";

interface FactionSimplified {
  id: string;
  attributes: {
    display_name: string;
    detachments: {
      data: {
        id: string;
        attributes: {
          display_name: string;
        };
      }[];
    };
  };
}

interface Faction {
  id: string;
  attributes: {
    display_name: string;
    detachments: {
      data: {
        id: string;
        attributes: {
          display_name: string;
        };
      }[];
    };
    ruleName: string;
    ruleDescription: string;
    extraRuleName: string;
    extraRuleDescription: string;
  };
}

export interface AllFactionsReturnType {
  factions: {
    data: FactionSimplified[];
  };
}

export interface SingleFactionReturnType {
  faction: {
    data: Faction;
  };
}

export const allFactionsQuery = gql`
  query GetAllFactions {
    factions {
      data {
        id
        attributes {
          display_name
          detachments {
            data {
              id
              attributes {
                display_name
              }
            }
          }
        }
      }
    }
  }
`;

export const factionByIDQuery = gql`
  query GetFaction($factionID: ID!) {
    faction(id: $factionID) {
      data {
        id
        attributes {
          display_name
          detachments {
            data {
              id
              attributes {
                display_name
              }
            }
          }
          ruleName
          ruleDescription
          extraRuleName
          extraRuleDescription
        }
      }
    }
  }
`;
