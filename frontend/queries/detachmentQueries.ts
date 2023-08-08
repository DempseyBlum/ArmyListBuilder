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

export const datasheetQuery = gql`
  query GetDetachments {
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
