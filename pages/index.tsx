import Head from "next/head";
import Dashboard from "./components/Dashboard";

export default function Home() {
  return (
    <div>
      <Head>
        <title>BeetWarden</title>
        <meta name="description" content="BeetWarden. A password manager" />
        <meta
          name="keywords"
          content="password, manager, beets, forgot password, save passwords"
        />
        <meta name="author" content="Andres Beltran" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ maxHeight: "100vh" }}>
        <Dashboard />
      </main>
    </div>
  );
}
