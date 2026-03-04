import Head from 'next/head';
import styles from './Layout.module.css';

const Layout = ({ title, keywords, children }) => {
  return (
    <div className={`${styles.layout}`}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
        {/* <link rel='icon' href='favicon.ico' /> */}
        {/* <link rel='shortcut icon' href='https://360nft.io/favicon.png' /> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      {children}
    </div>
  );
};

Layout.defaultProps = {
  title: 'Unitrap!',
  keywords: 'Unitrap, SoundMoney, Traptoken',
};

export default Layout;
