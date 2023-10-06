import type { NextPage } from "next";
import Head from "next/head";
import Game from "@src/components/Game";
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
        <Game
          boards={data.boards}
          drawSequence={data.drawNumbers}
        />
      </main>
    </div>
  );
};

export default Home;
