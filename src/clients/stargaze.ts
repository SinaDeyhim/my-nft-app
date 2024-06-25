import { GraphQLClient, gql } from "graphql-request";

const endpoint = "https://graphql.mainnet.stargaze-apis.com/graphql";

const client = new GraphQLClient(endpoint);

export interface NFT {
  id: string;
  description: string;
  media: {
    url: string;
  };
}

interface TokensResponse {
  tokens: {
    tokens: NFT[];
  };
}

interface TokensVariables {
  ownerAddrOrName: string;
  limit: number;
}

export const fetchNFTs = async (
  ownerAddrOrName: string,
  limit: number
): Promise<NFT[]> => {
  const query = gql`
    query OwnedTokens($ownerAddrOrName: String!, $limit: Int!) {
      tokens(ownerAddrOrName: $ownerAddrOrName, limit: $limit) {
        tokens {
          id
          description
          media {
            url
          }
        }
      }
    }
  `;

  const variables: TokensVariables = {
    ownerAddrOrName,
    limit,
  };

  const data: TokensResponse = await client.request(query, variables);
  return data.tokens.tokens;
};
