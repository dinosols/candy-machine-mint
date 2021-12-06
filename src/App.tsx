import "./App.css";
import { useMemo } from "react";
import NavBar from "./navBar/navBar";
import Home from "./Home";
import FaqCard from "./shared/FaqCard";
import placeHolderImage from './media/logo.png'
import * as anchor from "@project-serum/anchor";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolletWallet,
  getSolletExtensionWallet,
} from "@solana/wallet-adapter-wallets";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import TextAndImage from "./shared/TextAndImage";
import Footer from "./shared/Footer";
import { createTheme, ThemeProvider } from "@material-ui/core";

const treasury = new anchor.web3.PublicKey(
  process.env.REACT_APP_TREASURY_ADDRESS!
);

const config = new anchor.web3.PublicKey(
  process.env.REACT_APP_CANDY_MACHINE_CONFIG!
);

const candyMachineId = new anchor.web3.PublicKey(
  process.env.REACT_APP_CANDY_MACHINE_ID!
);

const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;

const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);

const startDateSeed = parseInt(process.env.REACT_APP_CANDY_START_DATE!, 10);

const txTimeout = 30000; // milliseconds (confirm this works for your project)

const theme = createTheme({
  palette: {
    type: 'dark',
  },
  overrides: {
    MuiButtonBase: {
      root: {
        justifyContent: 'flex-start',
      },
    },
    MuiButton: {
      root: {
        textTransform: undefined,
        padding: '12px 16px',
      },
      startIcon: {
        marginRight: 8,
      },
      endIcon: {
        marginLeft: 8,
      },
    },
  },
});

const App = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSlopeWallet(),
      getSolflareWallet(),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network })
    ],
    []
  );

  const FreeText = () => {
    return (
      <div style={{ borderTop: '1px solid #25282c', ...container, width: '50%', marginBottom: '30px' }} className='flex-column'>
        <h2 style={{ paddingTop: '30px' }}>What is Dinosol Kingdom?</h2>
        <p>
          Dinosols NFTs are generative dinosaur-themed Solana native NFT. The NFT enables the ability to access arena battle gameplay and performance-based leaderboard competitions.
</p>
<p>
          Dinosol Kingdom is completely on-chain turn-based arena battle gameplay. The metadata embedded in your Dinosol NFT informs your fighting abilities (e.g. attack, defense,
          agility, etc). Initially, your Dinosol will be able to fight against a CPU but we expect to quickly enable battle gameplay against other Dinosol holders. In addition, we
          plan on hosting Player versus Player tournaments with prizes and awards.
        </p>
      </div>
    )
  }

  const container = {
    justifyContent: 'center',
    alignItems: 'center',
  }

  return (
    <div style={{ background: 'black' }}>
      <NavBar />
      <div style={{ ...container, }} className='flex-column'>
        <div style={{ marginBottom: '30px' }}>
          <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
              <WalletDialogProvider>
                <Home
                  candyMachineId={candyMachineId}
                  config={config}
                  connection={connection}
                  startDate={startDateSeed}
                  treasury={treasury}
                  txTimeout={txTimeout}
                />
              </WalletDialogProvider>
            </WalletProvider>
          </ConnectionProvider>
        </div>
        <FreeText />
        <Footer
          image={placeHolderImage}
          roadmapLink='https://dinosols.app/#roadmap'
          faqLink='https://dinosols.app/#about'
        />
      </div>
    </div>
  );
};

export default App;
