import { HydrateWrapper } from "@/clients/ReactQueryClient";
import "../globals.css";
import type { AppProps } from "next/app";
import React from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { WalletProvider } from "@/components/WalletProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <HydrateWrapper dehydratedState={pageProps.dehydratedState}>
        <ErrorBoundary>
          <React.Suspense fallback={<div>Loading...</div>}>
            <WalletProvider>
              <Component {...pageProps} />
            </WalletProvider>
          </React.Suspense>
        </ErrorBoundary>
      </HydrateWrapper>
    </DndProvider>
  );
}

export default MyApp;
