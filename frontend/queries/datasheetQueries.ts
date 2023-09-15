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
      models_in_unit: {
        model: {
          data: {
            id: string;
            attributes: {
              display_name: string;
              unit_keywords: {
                data: {
                  id: string;
                  attributes: {
                    display_name: string;
                  };
                };
              };
              movement: number;
              toughness: number;
              save: number;
              wounds: number;
              leadership: number;
              objective_control: number;
              invul_save: number;
              default_wargear: [WargearOption | WeaponOption];
            };
          };
        };
        min: number;
        max: number;
      }[];
    }[];
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

export interface WargearOption {
  wargear: {
    data: {
      id: string;
      attributes: {
        display_name: string;
        ability: string;
      };
    };
  };
  points: number;
}

export interface WeaponOption {
  weapon: {
    data: Weapon;
  };
  points: number;
}

export interface SimplifiedOption {
  id: string;
  attributes: {
    display_name: string;
  };
}

export interface ReplacementPer5 {
  model: {
    data: {
      id: string;
      attributes: {
        display_name: string;
      };
    };
  };
  wargear_to_replace: {
    data: SimplifiedOption[];
  };
  weapons_to_replace: {
    data: SimplifiedOption[];
  };
  max_models_that_can_do_this: number;
  can_select_duplicates: boolean;
  options: {
    points: number;
    weapon_options: {
      data: SimplifiedOption[];
    };
    wargear_options: {
      data: SimplifiedOption[];
    };
    restrict_duplicates: boolean;
  };
}

export interface ReplacementPer10 {
  model: {
    data: {
      id: string;
      attributes: {
        display_name: string;
      };
    };
  };
  wargear_to_replace: {
    data: SimplifiedOption[];
  };
  weapons_to_replace: {
    data: SimplifiedOption[];
  };
  max_models_that_can_do_this: number;
  can_select_duplicates: boolean;
  options: {
    points: number;
    weapon_options: {
      data: SimplifiedOption[];
    };
    wargear_options: {
      data: SimplifiedOption[];
    };
    restrict_duplicates: boolean;
  };
}

export interface ThisModelMayReplace {
  model: {
    data: {
      id: string;
      attributes: {
        display_name: string;
      };
    };
  };
  wargear_to_replace: {
    data: SimplifiedOption[];
  };
  weapons_to_replace: {
    data: SimplifiedOption[];
  };
  options: {
    points: number;
    weapon_options: {
      data: SimplifiedOption[];
    };
    wargear_options: {
      data: SimplifiedOption[];
    };
    restrict_duplicates: boolean;
  };
}

export interface NumberModelsMayReplace {
  model: {
    data: {
      id: string;
      attributes: {
        display_name: string;
      };
    };
  };
  number: number;
  wargear_to_replace: {
    data: SimplifiedOption[];
  };
  weapons_to_replace: {
    data: SimplifiedOption[];
  };
  options: {
    points: number;
    weapon_options: {
      data: SimplifiedOption[];
    };
    wargear_options: {
      data: SimplifiedOption[];
    };
    restrict_duplicates: boolean;
  };
}

export interface ReplacementForAnyNumber {
  models: {
    data: {
      id: string;
      attributes: {
        display_name: string;
      };
    }[];
  };
  wargear_to_replace: {
    data: SimplifiedOption[];
  };
  weapons_to_replace: {
    data: SimplifiedOption[];
  };
  options: {
    points: number;
    weapon_options: {
      data: SimplifiedOption[];
    };
    wargear_options: {
      data: SimplifiedOption[];
    };
    restrict_duplicates: boolean;
  };
}

export interface ReplacementForSingleModel {
  model: {
    data: {
      id: string;
      attributes: {
        display_name: string;
      };
    };
  };
  wargear_to_replace: {
    data: SimplifiedOption[];
  };
  weapons_to_replace: {
    data: SimplifiedOption[];
  };
  options: {
    points: number;
    weapon_options: {
      data: SimplifiedOption[];
    };
    wargear_options: {
      data: SimplifiedOption[];
    };
    restrict_duplicates: boolean;
  };
}

export interface ThisModelCanBeEquippedWith {
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
      data: SimplifiedOption[];
    };
    wargear_options: {
      data: SimplifiedOption[];
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
            models_in_unit {
              model {
                data {
                  id
                  attributes {
                    display_name
                    unit_keywords {
                      data {
                        id
                        attributes {
                          display_name
                        }
                      }
                    }
                    movement
                    toughness
                    save
                    wounds
                    leadership
                    objective_control
                    invul_save
                    default_wargear {
                      ... on ComponentDatasheetWargearOption {
                        wargear {
                          data {
                            id
                            attributes {
                              display_name
                              ability
                            }
                          }
                        }
                        points
                      }
                      ... on ComponentDatasheetDefaultWeapon {
                        weapon {
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
                        points
                      }
                    }
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
              number
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
