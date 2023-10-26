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

export interface Datasheet {
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
    unit_composition: {
      model?: {
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
            default_wargear: [DatasheetWargear | DatasheetWeapon];
          };
        };
      };
      min: number;
      max?: number;
    }[];
    wargear_options: [WargearOption];
    lead_units_list: {
      data: {
        attributes: {
          display_name: string;
        };
      };
    };
  };
}

export interface WargearOption {
  label: string;
  weapons_to_lose: {
    data: {
      id: string;
      attributes: {
        display_name: string;
      };
    }[];
  };
  wargear_to_lose: {
    data: {
      id: string;
      attributes: {
        display_name: string;
      };
    }[];
  };
  restrict_via_model?: {
    data: {
      id: string;
      attributes: {
        display_name: string;
      };
    };
  };
  restrict_via_weapon?: {
    data: {
      id: string;
      attributes: {
        display_name: string;
      };
    };
  };
  restrict_via_wargear?: {
    data: {
      id: string;
      attributes: {
        display_name: string;
      };
    };
  };
  can_take_for_every?: number;
  how_many_models_can_take?: number;
  how_many_options_can_be_picked: number;
  allow_duplicates: boolean;
  gear_choices: GearChoice[];
}

export interface GearChoice {
  wargear_to_gain: {
    number_of: number;
    label: string;
    wargear: {
      data: {
        id: string;
        attributes: {
          display_name: string;
        };
      };
    };
  }[];
  weapons_to_gain: {
    number_of: number;
    label: string;
    weapon: {
      data: {
        id: string;
        attributes: {
          display_name: string;
        };
      };
    };
  }[];
  points: number;
  allow_duplicates_of_this_option: boolean;
  special_notes?: string;
}

export interface DatasheetWeapon {
  weapon: {
    data: Weapon;
  };
  points: number;
}
export interface DatasheetWargear {
  wargear: {
    data: Wargear;
  };
  points: number;
}

export interface SimplifiedOption {
  id: string;
  attributes: {
    display_name: string;
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
          unit_composition {
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
                    ... on ComponentDatasheetDefaultWargear {
                      wargear {
                        data {
                          id
                          attributes {
                            display_name
                            ability
                          }
                        }
                      }
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
                    }
                  }
                }
              }
            }
            min
            max
          }
          wargear_options {
            label
            weapons_to_lose {
              data {
                id
                attributes {
                  display_name
                }
              }
            }
            wargear_to_lose {
              data {
                id
                attributes {
                  display_name
                }
              }
            }
            restrict_via_model {
              data {
                id
                attributes {
                  display_name
                }
              }
            }
            restrict_via_weapon {
              data {
                id
                attributes {
                  display_name
                }
              }
            }
            restrict_via_wargear {
              data {
                id
                attributes {
                  display_name
                }
              }
            }
            can_take_for_every
            how_many_models_can_take
            how_many_options_can_be_picked
            allow_duplicates
            gear_choices {
              wargear_to_gain {
                number_of
                label
                wargear {
                  data {
                    id
                    attributes {
                      display_name
                    }
                  }
                }
              }
              weapons_to_gain {
                number_of
                label
                weapon {
                  data {
                    id
                    attributes {
                      display_name
                    }
                  }
                }
              }
              points
              allow_duplicates_of_this_option
            }
            special_notes
          }
          lead_units_list {
            data {
              id
              attributes {
                display_name
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
