import { gql } from "@apollo/client";

interface CoreKeyword {
  id: string;
  attributes: {
    display_name: string;
    description: string;
  };
}

export interface CoreKeywordsReturnType {
  coreKeywords: {
    data: CoreKeyword[];
  };
}

export interface SingleCoreKeywordReturnType {
  coreKeyword: {
    data: CoreKeyword;
  };
}

export const coreKeywordQuery = gql`
  query GetAllCoreKeywords {
    coreKeywords {
      data {
        id
        attributes {
          display_name
          description
        }
      }
    }
  }
`;

export const coreKeywordByIDQuery = gql`
  query GetCoreKeywordByID($coreKeywordID: ID!) {
    coreKeyword(id: $coreKeywordID) {
      data {
        id
        attributes {
          display_name
          description
        }
      }
    }
  }
`;

interface UnitKeyword {
  id: string;
  attributes: {
    display_name: string;
  };
}

export interface UnitKeywordsReturnType {
  unitKeywords: {
    data: UnitKeyword[];
  };
}

export interface SingleUnitKeywordReturnType {
  unitKeyword: {
    data: UnitKeyword;
  };
}

export const unitKeywordQuery = gql`
  query GetAllUnitKeywords {
    coreKeywords {
      data {
        id
        attributes {
          display_name
        }
      }
    }
  }
`;

export const unitKeywordByIDQuery = gql`
  query GetUnitKeywordByID($unitKeywordID: ID!) {
    unitKeyword(id: $unitKeywordID) {
      data {
        id
        attributes {
          display_name
          description
        }
      }
    }
  }
`;

interface WeaponKeyword {
  id: string;
  attributes: {
    display_name: string;
    description: string;
  };
}

export interface WeaponKeywordsReturnType {
  weaponKeywords: {
    data: WeaponKeyword[];
  };
}

export interface SingleWeaponKeywordReturnType {
  weaponKeyword: {
    data: WeaponKeyword;
  };
}

export const weaponKeywordQuery = gql`
  query GetAllWeaponKeywords {
    weaponKeywords {
      data {
        id
        attributes {
          display_name
          description
        }
      }
    }
  }
`;

export const weaponKeywordByIDQuery = gql`
  query GetWeaponKeywordByID($weaponKeywordID: ID!) {
    weaponKeyword(id: $weaponKeywordID) {
      data {
        id
        attributes {
          display_name
          description
        }
      }
    }
  }
`;
