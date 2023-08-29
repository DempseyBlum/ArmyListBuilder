import { gql } from "@apollo/client";

interface DetachmentSimplified {
  id: string;
  attributes: {
    display_name: string;
    faction: {
      data: {
        id: string;
        attributes: {
          display_name: string;
        };
      };
    };
  };
}

interface Detachment {
  id: string;
  attributes: {
    display_name: string;
    faction: {
      data: {
        id: string;
        attributes: {
          display_name: string;
        };
      };
    };
    ruleDescription: string;
    ruleFlavour: string;
    ruleName: string;
    stratagem_bundle: {
      data: {
        id: string;
        attributes: {
          name: string;
          stratagem: {
            display_name: string;
            cost: number;
            type: string;
            when: string;
            target: string;
            effect: string;
            restrictions: string;
          };
        };
      };
    };
    enhancements: {
      data: {
        id: string;
        attributes: {
          display_name: string;
          description: string;
          flavour: string;
        };
      };
    };
  };
}

export interface AllDetachmentsReturnType {
  detachments: {
    data: DetachmentSimplified[];
  };
}

export interface SingleDetachmentReturnType {
  detachment: {
    data: Detachment;
  };
}

export const allDatachmentsQuery = gql`
  query GetAllDetachments {
    detachments {
      data {
        id
        attributes {
          display_name
          faction {
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

export const detachmentByIDQuery = gql`
  query GetDetachment($detachmentID: ID!) {
    detachment(id: $detachmentID) {
      data {
        id
        attributes {
          display_name
          faction {
            data {
              id
              attributes {
                display_name
              }
            }
          }
          ruleDescription
          ruleFlavour
          ruleName
          stratagem_bundle {
            data {
              id
              attributes {
                name
                stratagem {
                  display_name
                  cost
                  type
                  when
                  target
                  effect
                  restrictions
                  display_name
                }
              }
            }
          }
          enhancements {
            data {
              id
              attributes {
                display_name
                description
                flavour
              }
            }
          }
        }
      }
    }
  }
`;

interface Enhancement {
  id: string;
  attributes: {
    name: string;
    description: string;
  };
}

export interface EnhancementReturnType {
  enhancements: {
    data: Enhancement[];
  };
}

export const enhancementByIDQuery = gql`
  query GetEnhancement($enhancementID: ID!) {
    enhancement(id: $enhancementID) {
      data {
        id
        attributes {
          display_name
          description
          flavour
        }
      }
    }
  }
`;

interface StratagemBundle {
  id: string;
  display_name;
  attributes: {
    name: string;
  };
}

export interface StratagemReturnType {
  stratagemList: {
    data: StratagemBundle[];
  };
}

export const stratagemByIDQuery = gql`
  query GetStratagem($stratagemID: ID!) {
    stratagemList(id: $stratagemID) {
      data {
        id
        attributes {
          name
          stratagem {
            display_name
            cost
            type
            when
            target
            effect
            restrictions
          }
        }
      }
    }
  }
`;
