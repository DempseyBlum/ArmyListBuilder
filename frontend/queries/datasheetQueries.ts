import { gql } from "@apollo/client";

interface Datasheet {
  id: string;
  attributes: {
    name: string;
    core_keywords: {
      data: {
        id: string;
        attributes: {
          name: string;
        };
      }[];
    };
    unit_keywords: {
      data: {
        id: string;
        attributes: {
          name: string;
        };
      }[];
    };
    faction: {
      data: {
        id: string;
        attributes: {
          name: string;
        };
      };
    };
    has_faction_ability: boolean;
    abilities: {
      name: string;
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
              name: string;
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
            name: string;
          };
        };
      };
      weapons_to_replace: {
        data: {
          id: string;
          attributes: {
            name: string;
          };
        }[];
      };
      wargear_to_replace: {
        data: {
          id: string;
          attributes: {
            name: string;
          };
        }[];
      };
      max_models_that_can_do_this: number;
      can_select_duplicates: boolean;
      options: {
        weapon_options: {
          data: {
            id: string;
            attributes: {
              name: string;
            };
          };
        }[];
        points: number;
        wargear_options: {
          data: {
            id: string;
            attributes: {
              name: string;
            };
          };
        }[];
        restrict_duplicates: boolean;
      }[];
    }[];
  };
}

export interface DatasheetsReturnType {
  unitDatasheets: {
    data: Datasheet[];
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
          name
          core_keywords {
            data {
              id
              attributes {
                name
              }
            }
          }
          unit_keywords {
            data {
              id
              attributes {
                name
              }
            }
          }
          faction {
            data {
              id
              attributes {
                name
              }
            }
          }
          has_faction_ability
          abilities {
            name
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
                    name
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
                  name
                }
              }
            }
            weapons_to_replace {
              data {
                id
                attributes {
                  name
                }
              }
            }
            wargear_to_replace {
              data {
                id
                attributes {
                  name
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
                    name
                  }
                }
              }
              points
              wargear_options {
                data {
                  id
                  attributes {
                    name
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

export const datasheetByIDQuery = gql`
  query GetAllDatasheets ($datasheetID: ID!)){
    unitDatasheets (id: $datasheetID){
      data {
        id
        attributes {
          name
          core_keywords {
            data {
              id
              attributes {
                name
              }
            }
          }
          unit_keywords {
            data {
              id
              attributes {
                name
              }
            }
          }
          faction {
            data {
              id
              attributes {
                name
              }
            }
          }
          has_faction_ability
          abilities {
            name
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
                    name
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
                  name
                }
              }
            }
            weapons_to_replace {
              data {
                id
                attributes {
                  name
                }
              }
            }
            wargear_to_replace {
              data {
                id
                attributes {
                  name
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
                    name
                  }
                }
              }
              points
              wargear_options {
                data {
                  id
                  attributes {
                    name
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

// Need to double check this one. Had copilot do this.
export const factionDatasheetsQuery = gql`
  query GetFactionDatasheets($factionId: ID!) {
    unitDatasheets(filter: { faction: { data: { id: { eq: $factionId } } } }) {
      data {
        id
        attributes {
          name
          core_keywords {
            data {
              id
              attributes {
                name
              }
            }
          }
          unit_keywords {
            data {
              id
              attributes {
                name
              }
            }
          }
          faction {
            data {
              id
              attributes {
                name
              }
            }
          }
          has_faction_ability
          abilities {
            name
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
                    name
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
                  name
                }
              }
            }
            weapons_to_replace {
              data {
                id
                attributes {
                  name
                }
              }
            }
            wargear_to_replace {
              data {
                id
                attributes {
                  name
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
                    name
                  }
                }
              }
              points
              wargear_options {
                data {
                  id
                  attributes {
                    name
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
