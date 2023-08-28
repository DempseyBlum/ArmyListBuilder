import { gql } from "@apollo/client";

interface Detachment {
  id: string;
  attributes: {
    name: string;
    faction: {
      data: {
        id: string;
        attributes: {
          name: string;
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
        };
      };
    };
    enhancements: {
      data: {
        id: string;
        attributes: {
          name: string;
          description: string;
        };
      }[];
    };
  };
}

export interface DetachmentsReturnType {
  detachments: {
    data: Detachment[];
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
          name
          faction {
            data {
              id
              attributes {
                name
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
              }
            }
          }
          enhancements {
            data {
              id
              attributes {
                name
                description
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
    detachments(id: $detachmentID) {
      data {
        id
        attributes {
          name
          faction {
            data {
              id
              attributes {
                name
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
              }
            }
          }
          enhancements {
            data {
              id
              attributes {
                name
                description
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
          name
          description
        }
      }
    }
  }
`;

interface StratagemBundle {
  id: string;
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
          description
        }
      }
    }
  }
`;
