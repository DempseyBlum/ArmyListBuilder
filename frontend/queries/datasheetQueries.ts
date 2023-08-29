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
    points_costs: {
      model_count: number;
      points: number;
    }[];
  };
}

interface Datasheet {
  id;
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
          ruleName: string;
          ruleDescription: string;
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
              display_name: string;
            };
          };
        };
        min: number;
        max: number;
      };
    };
    wargear_options: [
      | ReplacementPer5
      | ReplacementPer10
      | ThisModelMayReplace
      | NumberModelsMayReplace
      | ReplacementForAnyNumber
      | ReplacementForSingleModel
      | ThisModelCanBeEquippedWith
    ];
  };
}

interface ReplacementPer5 {
  model: {
    data: {
      id: string;
      attributes: {
        display_name: string;
      };
    };
  };
  wargear_to_replace: {
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
    };
  };
  max_models_that_can_do_this: number;
  can_select_duplicates: boolean;
  options: {
    points: number;
    weapon_options: {
      data: {
        id: string;
        attributes: {
          display_name: string;
        };
      };
    };
    wargear_options: {
      data: {
        id: string;
        attributes: {
          display_name: string;
        };
      };
    };
    restrict_duplicates: boolean;
  };
}

interface ReplacementPer10 {
  model: {
    data: {
      id: string;
      attributes: {
        display_name: string;
      };
    };
  };
  wargear_to_replace: {
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
    };
  };
  max_models_that_can_do_this: number;
  can_select_duplicates: boolean;
  options: {
    points: number;
    weapon_options: {
      data: {
        id: string;
        attributes: {
          display_name: string;
        };
      };
    };
    wargear_options: {
      data: {
        id: string;
        attributes: {
          display_name: string;
        };
      };
    };
    restrict_duplicates: boolean;
  };
}

interface ThisModelMayReplace {
  model: {
    data: {
      id: string;
      attributes: {
        display_name: string;
      };
    };
  };
  wargear_to_replace: {
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
    };
  };
  options: {
    points: number;
    weapon_options: {
      data: {
        id: string;
        attributes: {
          display_name: string;
        };
      };
    };
    wargear_options: {
      data: {
        id: string;
        attributes: {
          display_name: string;
        };
      };
    };
    restrict_duplicates: boolean;
  };
}

interface NumberModelsMayReplace {
  model: {
    data: {
      id: string;
      attributes: {
        display_name: string;
      };
    };
  };
  wargear_to_replace: {
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
    };
  };
  options: {
    points: number;
    weapon_options: {
      data: {
        id: string;
        attributes: {
          display_name: string;
        };
      };
    };
    wargear_options: {
      data: {
        id: string;
        attributes: {
          display_name: string;
        };
      };
    };
    restrict_duplicates: boolean;
  };
}

interface ReplacementForAnyNumber {
  models: {
    data: {
      id: string;
      attributes: {
        display_name: string;
      };
    };
  };
  wargear_to_replace: {
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
    };
  };
  options: {
    points: number;
    weapon_options: {
      data: {
        id: string;
        attributes: {
          display_name: string;
        };
      };
    };
    wargear_options: {
      data: {
        id: string;
        attributes: {
          display_name: string;
        };
      };
    };
    restrict_duplicates: boolean;
  };
}

interface ReplacementForSingleModel {
  model: {
    data: {
      id: string;
      attributes: {
        display_name: string;
      };
    };
  };
  wargear_to_replace: {
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
    };
  };
  options: {
    points: number;
    weapon_options: {
      data: {
        id: string;
        attributes: {
          display_name: string;
        };
      };
    };
    wargear_options: {
      data: {
        id: string;
        attributes: {
          display_name: string;
        };
      };
    };
    restrict_duplicates: boolean;
  };
}

interface ThisModelCanBeEquippedWith {
  model: {
    data: {
      id: string;
      attributes: {
        display_name: string;
      };
    };
  };
  options: {
    points: number;
    weapon_options: {
      data: {
        id: string;
        attributes: {
          display_name: string;
        };
      };
    };
    wargear_options: {
      data: {
        id: string;
        attributes: {
          display_name: string;
        };
      };
    };
    restrict_duplicates: boolean;
  };
}

export interface DatasheetsReturnType {
  unitDatasheets: {
    data: DatasheetSimplified[];
  };
}

export interface SingleDatasheetReturnType {
  unitDatasheet: {
    data: Datasheet;
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
  query GetAllDatasheets($datasheetID: ID!) {
    unitDatasheet(id: $datasheetID) {
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
                ruleName
                ruleDescription
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
                    display_name
                  }
                }
              }
              min
              max
            }
          }
          wargear_options {
            ... on ComponentDatasheetReplacementPer5 {
              model {
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
              weapons_to_replace {
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
                points
                weapon_options {
                  data {
                    id
                    attributes {
                      display_name
                    }
                  }
                }
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
            ... on ComponentDatasheetReplacementPer10 {
              model {
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
              weapons_to_replace {
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
                points
                weapon_options {
                  data {
                    id
                    attributes {
                      display_name
                    }
                  }
                }
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
            ... on ComponentDatasheetThisModelMayReplace {
              model {
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
              weapons_to_replace {
                data {
                  id
                  attributes {
                    display_name
                  }
                }
              }
              options {
                points
                weapon_options {
                  data {
                    id
                    attributes {
                      display_name
                    }
                  }
                }
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
            ... on ComponentDatasheetNumberModelsMayReplace {
              model {
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
              weapons_to_replace {
                data {
                  id
                  attributes {
                    display_name
                  }
                }
              }
              options {
                points
                weapon_options {
                  data {
                    id
                    attributes {
                      display_name
                    }
                  }
                }
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
            ... on ComponentDatasheetReplacementForAnyNumber {
              models {
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
              weapons_to_replace {
                data {
                  id
                  attributes {
                    display_name
                  }
                }
              }
              options {
                points
                weapon_options {
                  data {
                    id
                    attributes {
                      display_name
                    }
                  }
                }
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
            ... on ComponentDatasheetReplacementForSingleModel {
              model {
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
              weapons_to_replace {
                data {
                  id
                  attributes {
                    display_name
                  }
                }
              }
              options {
                points
                weapon_options {
                  data {
                    id
                    attributes {
                      display_name
                    }
                  }
                }
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
            ... on ComponentDatasheetThisModelCanBeEquippedWith {
              model {
                data {
                  id
                  attributes {
                    display_name
                  }
                }
              }
              options {
                points
                weapon_options {
                  data {
                    id
                    attributes {
                      display_name
                    }
                  }
                }
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
  }
`;

export const factionDatasheetsQuery = gql`
  query GetFactionDatasheets($factionID: ID!) {
    unitDatasheets(filters: { faction: { id: { eq: $factionID } } }) {
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
