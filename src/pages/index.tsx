import { useEffect, useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import { fetchNFTs, NFT } from "../clients/stargaze";
import { HydrateWrapper } from "../clients/ReactQueryClient";
import DropZone from "@/components/DropZone";
import DraggableNFT from "@/components/DraggableNFT";

import { NFTProvider } from "@/providers/NFTProvider";

const Home = () => {
  const [address, setAddress] = useState("");
  const [limit, setLimit] = useState(10);
  const [error, setError] = useState(false);
  const [nfts, setNfts] = useState<NFT[]>([]);

  const { isLoading } = useQuery(
    ["nfts", address, limit],
    () => fetchNFTs(address, limit),
    {
      enabled: !!address,
      onSuccess: (data) => {
        setNfts(data);
      },
      onError: () => {
        setError(true);
      },
    }
  );

  return (
    <Layout>
      <div className="p-4">
        <form className="mb-4">
          <div className="flex flex-row flex-grow">
            <label className="block mb-2 mr-4">
              Wallet Address:
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="block w-[400px] mt-1 p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block mb-2">
              Limit:
              <input
                type="number"
                value={limit}
                onChange={(e) => setLimit(parseInt(e.target.value || "10"))}
                className="block  mt-1 p-2 border border-gray-300 rounded w-[60px]"
              />
            </label>
          </div>
        </form>

        {isLoading && !error && <div>Loading...</div>}
        {!!error && <div> Something went wrong</div>}
        {nfts && (
          <NFTProvider nfts={nfts}>
            <DropZone>
              {nfts.map((nft) => (
                <DraggableNFT key={nft.id} nft={nft} />
              ))}
            </DropZone>
          </NFTProvider>
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
      <NFTProvider nfts={[]}>
        <Home />
      </NFTProvider>
    </HydrateWrapper>
  );
}
