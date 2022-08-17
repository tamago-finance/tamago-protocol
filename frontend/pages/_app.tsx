import type { AppProps } from 'next/app'
import Head from 'next/head'
import Footer from "../components/footer"
import Header from "../components/header"
import { createGlobalStyle } from "styled-components";
import { MoralisProvider } from "react-moralis";
import { ethers } from "ethers";
import { MORALIS_ID, MORALIS_URL } from '../constants';
import { Web3ReactProvider } from '@web3-react/core';

import "react-loading-skeleton/dist/skeleton.css"
import 'react-tabs/style/react-tabs.css';

import { SkeletonTheme } from "react-loading-skeleton"

const getLibrary = (provider: any) => {
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0; 
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    color: white;
    background-color: #20283E;
    /* Full height */ 
    background-image:  url('https://img.tamago.finance/bg-2.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 100vh;
  }

  a {
    color: inherit;
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }

  * {
    box-sizing: border-box;
  }

`;


function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <title>Tamago Protocol</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Web3ReactProvider getLibrary={getLibrary}>
          <MoralisProvider serverUrl={MORALIS_URL || ""} appId={MORALIS_ID || ""}>
            <SkeletonTheme highlightColor="#ccc">
              <GlobalStyle />
              <Header />
              <Component {...pageProps} />
              <Footer />
            </SkeletonTheme>
          </MoralisProvider>
        </Web3ReactProvider>
      </div>

    </>
  )
}

export default MyApp
