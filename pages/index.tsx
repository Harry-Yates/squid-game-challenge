import type { NextPage } from "next";
import Head from "next/head";
import BingoCard from "../src/components/BingoCard";
import useGameData from "@src/hooks/useGameData";

const Home: NextPage = () => {
  const { data, isLoading, isError } = useGameData();

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error loading game data</p>;

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
        <BingoCard
          numbers={data.boards[0]}
          drawnNumbers={data.drawNumbers}
        />
      </main>
    </div>
  );
};

export default Home;
