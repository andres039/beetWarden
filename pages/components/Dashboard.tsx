import React, { useState } from "react";
import AccountInfo from "./accountInfo";
import Accounts from "./Navbar";
import { Grid } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useAuth0 } from "@auth0/auth0-react";
import Mobile from "./Mobile";

const Dashboard = () => {
  const { user } = useAuth0();
  const [currentAccount, setCurrentAccount] = useState({
    name: "",
    username: "",
    password: "",
    url: "",
    owner_id: "",
  });
  const [inputsDisabled, setInputsDisabled] = useState(false);
  const isMobile = useMediaQuery("(min-width: 900px)");
  return (
    <>
      {user && (
        <Grid m="0">
          {!isMobile ? (
            <Mobile
              currentAccount={currentAccount}
              inputsDisabled={inputsDisabled}
              setInputsDisabled={setInputsDisabled}
              setCurrentAccount={setCurrentAccount}
            />
          ) : (
            <>
              <Grid.Col span={3}>
                <Accounts
                  setCurrentAccount={setCurrentAccount}
                  setInputsDisabled={setInputsDisabled}
                />
              </Grid.Col>

              <Grid.Col span={9}>
                <AccountInfo
                  currentAccount={currentAccount}
                  inputsDisabled={inputsDisabled}
                  setInputsDisabled={setInputsDisabled}
                  setCurrentAccount={setCurrentAccount}
                />
              </Grid.Col>
            </>
          )}
        </Grid>
      )}
    </>
  );
};

export default Dashboard;
