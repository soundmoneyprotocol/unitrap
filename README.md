# Unitrap - Web3 DEX Interface

A modern, user-friendly decentralized exchange interface built with Next.js and Web3 technologies. Unitrap enables seamless token swapping and DeFi interactions with an intuitive user experience.

## 🚀 Live Demo

**Production:** https://unitrap-one.vercel.app
**Integrated in SoundMoney:** https://soundmoneyprotocol.xyz (Swap menu)

## ✨ Features

- 🔗 **Multi-Chain Wallet Support** - Connect via RainbowKit (MetaMask, WalletConnect, etc.)
- 💱 **Token Swapping** - Swap between supported tokens with real-time pricing
- 💰 **Balance Management** - View and manage token balances across chains
- 🎨 **Modern UI** - Clean, responsive design with theme support
- ⚡ **Real-Time Quotes** - Live swap quotes and slippage protection
- 📱 **Mobile Optimized** - Fully responsive interface

## 🛠️ Tech Stack

- **Frontend:** Next.js 13, React 18, JavaScript
- **Web3:** wagmi, viem, ethers, RainbowKit
- **Styling:** Bootstrap, CSS Modules
- **UI Components:** Headless UI, React Icons
- **State Management:** React Query, React Redux

## 📋 Supported Chains

Currently configured for:
- Ethereum Mainnet
- Polygon
- Optimism
- Arbitrum
- Merlin Testnet

*Note: Chain support is configurable via `src/Provider/rainbowkitProvider.js`*

## 🤝 Smart Contracts

**Merlin Testnet Contracts:**
- BTC Token: `0xAAF23F0894f8CaE3051207D82588EcFff9531358`
- TST Token: `0x6C593A8Eb76a3769b360e8271C701702FE1a6ffD`

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- A Web3 wallet (MetaMask, Phantom, etc.)

### Installation

```bash
# Clone the repository
git clone https://github.com/soundmoneyprotocol/unitrap.git
cd unitrap

# Install dependencies
npm install
# or
yarn install
```

### Environment Setup

Create a `.env.local` file:

```env
NEXT_PUBLIC_PROJECT_ID=4d7377d0f1b846a4058e8f547925c996
```

The `NEXT_PUBLIC_PROJECT_ID` is for WalletConnect integration. Get one at https://cloud.walletconnect.com

### Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📖 Pages

- **`/`** - Main swap interface
- **`/login`** - Wallet connection
- **`/buy`** - Token purchasing
- **`/rewards`** - Rewards dashboard
- **`/vote`** - Governance voting

## 🏗️ Project Structure

```
unitrap/
├── pages/              # Next.js pages and routes
├── src/
│   ├── Provider/       # Wallet and Web3 providers
│   ├── component/      # React components
│   ├── TokenMockData/  # Token configurations
│   └── styles/         # Global styles
├── artifacts/          # Smart contract ABIs
├── public/             # Static assets
└── package.json
```

## 🔄 Workflow

1. **Connect Wallet** - User connects via RainbowKit
2. **Select Tokens** - Choose input and output tokens
3. **Get Quote** - Real-time swap quote is fetched
4. **Approve Token** - User approves spending (if needed)
5. **Execute Swap** - Transaction is signed and executed
6. **Confirmation** - Transaction is confirmed on blockchain

## ⚙️ Configuration

### Add New Chain

Edit `src/Provider/rainbowkitProvider.js`:

```javascript
const myChain = {
  id: 123,
  name: "My Chain",
  nativeCurrency: { name: "Token", symbol: "TOK", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.mychain.io"] },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://explorer.mychain.io" },
  },
};

// Add to chains array in getDefaultConfig()
```

### Update Tokens

Edit `src/TokenMockData/index.js` to add new tokens:

```javascript
{
  name: "Token Name",
  symbol: "SYMBOL",
  contractAddress: "0x...",
  price: 100,
  decimals: 18,
}
```

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🔄 Migration Roadmap

### Planned: Jupiter API Integration (Solana)
- Migrate to Solana blockchain
- Integrate Jupiter Aggregator API
- Support for SOL and SPL tokens
- Phantom wallet integration

*See `JUPITER_API_MIGRATION.md` for details (coming soon)*

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📝 License

This project is part of the SoundMoney Protocol ecosystem.

## 🔗 Links

- **Website:** https://soundmoneyprotocol.xyz
- **SocialFi:** https://social.soundmoneyprotocol.xyz
- **Discord:** https://discord.gg/2WJTD94uZT
- **Twitter:** https://x.com/soundmoneyxyz

## ⚠️ Security Notice

This is a decentralized finance application. Always:
- ✅ Verify contract addresses
- ✅ Check slippage settings before swapping
- ✅ Use small amounts for testing
- ✅ Never share private keys or seed phrases

## 📧 Support

For issues, questions, or feature requests, please open a GitHub issue or reach out via our Discord community.

---

**Built for the SoundMoney Protocol** 🎵💰
