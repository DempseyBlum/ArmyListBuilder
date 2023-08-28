import { gql } from "@apollo/client";

interface Wargear {
  id: string;
  attributes: {
    name: string;
  };
}

export interface WargearReturnType {
  wargears: {
    data: Wargear[];
  };
}

export interface SingleWargearReturnType {
  wargear: {
    data: Wargear;
  };
}

export const allWargearQuery = gql`
  query GetAllWargear {
    wargears {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;

export const wargearByIDQuery = gql`
  query GetWargearByID($wargearID: ID!) {
    wargear(id: $wargearID) {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;

interface Weapon {
  id: string;
  attributes: {
    name: string;
  };
}

export interface WeaponReturnType {
  weapons: {
    data: Weapon[];
  };
}

export interface SingleWeaponReturnType {
  weapon: {
    data: Weapon;
  };
}

export const allWeaponsQuery = gql`
  query GetAllWeapon {
    weapons {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;

export const weaponByIDQuery = gql`
  query GetWeaponByID($weaponID: ID!) {
    weapon(id: $weaponID) {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;
