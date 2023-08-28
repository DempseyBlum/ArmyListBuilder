import { gql } from "@apollo/client";

interface CoreKeyword {
  id: string;
  attributes: {
    name: string;
    description: string;
  };
}

export interface CoreKeywordsReturnType {
  coreKeywords: {
    data: CoreKeyword[];
  };
}

export const coreKeywordQuery = gql`
  query GetAllCoreKeywords {
    coreKeywords {
      data {
        id
        attributes {
          name
          description
        }
      }
    }
  }
`;

interface UnitKeyword {
  id: string;
  attributes: {};
}

export interface UnitKeywordsReturnType {
  unitKeywords: {
    data: UnitKeyword[];
  };
}

export const unitKeywordQuery = gql`
  query GetAllCoreKeywords {
    coreKeywords {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;

interface WeaponKeyword {
  id: string;
  attributes: {
    name: string;
    description: string;
  };
}

export interface WeaponKeywordsReturnType {
  weaponKeywords: {
    data: WeaponKeyword[];
  };
}

export const weaponKeywordQuery = gql`
  query GetAllWeaponKeywords {
    weaponKeywords {
      data {
        id
        attributes {
          name
          description
        }
      }
    }
  }
`;
