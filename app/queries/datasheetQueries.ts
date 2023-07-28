const datasheetQuery = gql`
  query {
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
          ranged_weapons {
            data {
              id
              attributes {
                name
              }
            }
          }
          melee_weapons {
            data {
              id
              attributes {
                name
              }
            }
          }
          movement
          toughness
          save
          wounds
          leadership
          oc
          abilities {
            name
            description
          }
          wargear_abilties {
            name
            description
          }
          invul_save
        }
      }
    }
  }
`;
