import { gql } from "@apollo/client";
import { Wargear, Weapon } from "./equipmentQueries";

interface DatasheetSimplified {
  id: string;
  attributes: {
    display_name;
    core_keywords: {
      data: {
        id: string;
        attributes: {
          display_name: string;
        };
      };
    };
    unit_keywords: {
      data: {
        id: string;
        attributes: {
          display_name: string;
        };
      };
    };
    faction: {
      data: {
        id: string;
        attributes: {
          display_name: string;
        };
      };
    };
    points_costs: {
      model_count: number;
      points: number;
    };
  };
}

interface Datasheet {
  id: string;
  attributes: {
    display_name: string;
    core_keywords: {
      data: {
        id: string;
        attributes: {
          display_name: string;
        };
      }[];
    };
    unit_keywords: {
      data: {
        id: string;
        attributes: {
          display_name: string;
        };
      }[];
    };
    faction: {
      data: {
        id: string;
        attributes: {
          display_name: string;
        };
      };
    };
    has_faction_ability: boolean;
    abilities: {
      display_name: string;
      description: string;
    }[];
    points_costs: {
      model_count: number;
      points: number;
    }[];
    unit_composition_options: {
      model: {
        model: {
          data: {
            id: string;
            attributes: {
              display_name: string;
            };
          };
        };
        min: number;
        max: number;
      }[];
    }[];
    wargear_options: {
      model: {
        data: {
          id: string;
          attributes: {
            display_name: string;
          };
        };
      };
      weapons_to_replace: {
        data: {
          id: string;
          attributes: {
            display_name: string;
          };
        }[];
      };
      wargear_to_replace: {
        data: {
          id: string;
          attributes: {
            display_name: string;
          };
        }[];
      };
      max_models_that_can_do_this: number;
      can_select_duplicates: boolean;
      options: {
        weapon_options: {
          data: Weapon;
        }[];
        points: number;
        wargear_options: {
          data: Wargear;
        }[];
        restrict_duplicates: boolean;
      }[];
    }[];
  };
}

export interface DatasheetsReturnType {
  unitDatasheets: {
    data: DatasheetSimplified[];
  };
}

export interface SingleDatasheetReturnType {
  unitDatasheet: {
    data: Datasheet[];
  };
}

export const allDatasheetsQuery = gql`
  query GetAllDatasheets {
    unitDatasheets {
      data {
        id
        attributes {
          display_name
          core_keywords {
            data {
              id
              attributes {
                display_name
              }
            }
          }
          unit_keywords {
            data {
              id
              attributes {
                display_name
              }
            }
          }
          faction {
            data {
              id
              attributes {
                display_name
              }
            }
          }
          points_costs {
            model_count
            points
          }
        }
      }
    }
  }
`;

export const datasheetByIDQuery = gql`
  query GetAllDatasheets ($datasheetID: ID!)){
    unitDatasheets (id: $datasheetID){
      data {
        id
        attributes {
          display_name
          core_keywords {
            data {
              id
              attributes {
                display_name
              }
            }
          }
          unit_keywords {
            data {
              id
              attributes {
                display_name
              }
            }
          }
          faction {
            data {
              id
              attributes {
                display_name
              }
            }
          }
          has_faction_ability
          abilities {
            display_name
            description
          }
          points_costs {
            model_count
            points
          }
          unit_composition_options {
            model {
              model {
                data {
                  id
                  attributes {
                    display_name
                  }
                }
              }
              min
              max
            }
          }
          wargear_options {
            model {
              data {
                id
                attributes {
                  display_name
                }
              }
            }
            weapons_to_replace {
              data {
                id
                attributes {
                  display_name
                }
              }
            }
            wargear_to_replace {
              data {
                id
                attributes {
                  display_name
                }
              }
            }
            max_models_that_can_do_this
            can_select_duplicates
            options {
              weapon_options {
                data {
                  id
                  attributes {
                    display_name
                  }
                }
              }
              points
              wargear_options {
                data {
                  id
                  attributes {
                    display_name
                  }
                }
              }
              restrict_duplicates
            }
          }
        }
      }
    }
  }
`;

export const factionDatasheetsQuery = gql`
  query GetFactionDatasheets($factionId: ID!) {
    unitDatasheets(filters: { faction: { id: { eq: 1 } } }) {
      data {
        id
        attributes {
          display_name
          core_keywords {
            data {
              id
              attributes {
                display_name
              }
            }
          }
          unit_keywords {
            data {
              id
              attributes {
                display_name
              }
            }
          }
          faction {
            data {
              id
              attributes {
                display_name
              }
            }
          }
          points_costs {
            model_count
            points
          }
        }
      }
    }
  }
`;
