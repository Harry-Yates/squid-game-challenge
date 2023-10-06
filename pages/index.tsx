import type { NextPage } from "next";
import Head from "next/head";
import BingoCard from "../src/components/BingoCard";
import testData from "../src/data/testData.json";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Squid Game Challenge</title>
        <meta
          name="description"
          content="Bingo Squid Game Challenge"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>

      <main>
        <h1>Squid Game Challenge</h1>
        <BingoCard numbers={testData.boards[0]} />
      </main>
    </div>
  );
};

export default Home;
