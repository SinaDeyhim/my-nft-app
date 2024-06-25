import { useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import { fetchNFTs, NFT } from "../clients/stargaze";
import { HydrateWrapper } from "../clients/ReactQueryClient";
import DropZone from "@/components/DropZone";
import DraggableNFT from "@/components/DraggableNFT";
import {
  NFTPositionProvider,
  useNFTPositionContext,
} from "@/providers/NFTPositionProvider";

const Home = () => {
  const [address, setAddress] = useState(
    "stars183zdj3lh7kkud8ywre0cxv8g8h0uyle7nu2zkc"
  );
  const [limit, setLimit] = useState(10);
  const [nfts, setNfts] = useState<NFT[]>([]);

  const { isLoading, error } = useQuery(
    ["nfts", address, limit],
    () => fetchNFTs(address, limit),
    {
      enabled: !!address,
      onSuccess: (data) => {
        setNfts(data);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Trigger the query to fetch NFTs
  };

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-xl font-bold">NFT Display App</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <label className="block mb-2">
            Wallet Address:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="block w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </label>
          <button
            type="submit"
            className="mt-2 p-2 bg-blue-500 text-white rounded"
          >
            Fetch NFTs
          </button>
        </form>

        {isLoading && <div>Loading...</div>}
        {!!error && <div> Something went wrong</div>}
        {nfts && (
          <NFTPositionProvider nfts={nfts}>
            <DropZone>
              {nfts.map((nft) => (
                <DraggableNFT key={nft.id} nft={nft} />
              ))}
            </DropZone>
          </NFTPositionProvider>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  // Pre-fetch some initial data if needed
  await queryClient.prefetchQuery(["nfts", "default_address"], () =>
    fetchNFTs("default_address", 10)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Page(props: any) {
  return (
    <HydrateWrapper dehydratedState={props.dehydratedState}>
      <NFTPositionProvider nfts={[]}>
        <Home />
      </NFTPositionProvider>
    </HydrateWrapper>
  );
}
