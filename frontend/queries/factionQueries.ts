import { gql } from "@apollo/client";

interface Faction {
  id: string;
  attributes: {
    name: string;
    description: string;
  };
}

export interface FactionsReturnType {
  factions: {
    data: Faction[];
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
          name
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
          name
        }
      }
    }
  }
`;
