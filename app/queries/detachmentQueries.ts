import { gql } from "@apollo/client";

const datasheetQuery = gql`
  query {
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
