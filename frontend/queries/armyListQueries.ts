import { gql } from "@apollo/client";

interface ArmyList {
  id: string;
  attributes: {
    name: string;
  };
}

export interface ArmyListsReturnType {
  armyLists: {
    data: ArmyList[];
  };
}

export interface SingleArmyListReturnType {
  armyList: {
    data: ArmyList;
  };
}

export const armyListByIDQuery = gql`
  query GetArmyListByID($armyListID: ID!) {
    coreKeywords(id: $armyListID) {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;

// Need to check how to actually filter on users
export const armyListByUserQuery = gql`
  query GetArmyListByUser($userID: ID!) {
    coreKeywords (filter: { user: { id: { eq: $userID } } })
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;
