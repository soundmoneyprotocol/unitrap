import { RainbowKitWrapper } from "../src/Provider/rainbowkitProvider";
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

function MyApp({ Component, pageProps }) {
  return (
    <RainbowKitWrapper>
      <Component {...pageProps} />
    </RainbowKitWrapper>
  );
}

export default MyApp;
