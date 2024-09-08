export const listWords = /* GraphQL */ `
  query ListWords {
    listWords {
      items {
        id
        english
        chinese
        example
      }
    }
  }
`;