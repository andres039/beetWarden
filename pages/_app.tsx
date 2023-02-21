import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithAuth0 } from "convex/react-auth0";
import convexConfig from "../convex.json";
import { MantineProvider } from "@mantine/core";

import Login from "./components/Login";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
const authInfo = convexConfig.authInfo[0];

function MyApp({ Component, pageProps }) {
  return (
    <ConvexProviderWithAuth0
      client={convex}
      authInfo={authInfo}
      loggedOut={<Login />}
    >
      <MantineProvider
        withNormalizeCSS

      >
        <Component {...pageProps} />
      </MantineProvider>
    </ConvexProviderWithAuth0>
  );
}

export default MyApp;
