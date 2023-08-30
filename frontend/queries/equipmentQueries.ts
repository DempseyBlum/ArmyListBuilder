import { gql } from "@apollo/client";

export interface Wargear {
  id: string;
  attributes: {
    display_name: string;
    ability: string;
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
          display_name
          ability
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
          display_name
          ability
        }
      }
    }
  }
`;

interface WeaponSimplified {
  id: string;
  attributes: {
    display_name: string;
  };
}

export interface Weapon {
  id: string;
  attributes: {
    display_name: string;
    ranged_weapon_stats: {
      display_name_override: string;
      weapon_keywords: {
        data: {
          id: string;
          attributes: {
            display_name: string;
          };
        }[];
      };
      range: number;
      skill: number;
      attacks: string;
      penetration: string;
      strength: string;
      damage: string;
    }[];
    melee_weapon_stats: {
      display_name_override: string;
      weapon_keywords: {
        data: {
          id: string;
          attributes: {
            display_name: string;
          };
        }[];
      };
      attacks: string;
      skill: number;
      strength: string;
      penetration: string;
      damage: string;
    }[];
  };
}

export interface WeaponReturnType {
  weapons: {
    data: WeaponSimplified[];
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
          display_name
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
          display_name
          ranged_weapon_stats {
            display_name_override
            weapon_keywords {
              data {
                id
                attributes {
                  display_name
                }
              }
            }
            range
            skill
            attacks
            penetration
            strength
            damage
          }
          melee_weapon_stats {
            display_name_override
            weapon_keywords {
              data {
                id
                attributes {
                  display_name
                }
              }
            }
            attacks
            skill
            strength
            penetration
            damage
          }
        }
      }
    }
  }
`;
