import React, { useState } from "react";
import AccountInfo from "./accountInfo";
import Accounts from "./accounts";
import { Card, Center, Container, Grid } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";

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
  return (
    <>
      {user && (
        <Grid>
          <Grid.Col span={3}>

            <Accounts setCurrentAccount={setCurrentAccount}setInputsDisabled={setInputsDisabled} />

          </Grid.Col>

          <Grid.Col span={9}>

            <AccountInfo
              currentAccount={currentAccount}
              inputsDisabled={inputsDisabled}
              setInputsDisabled={setInputsDisabled}
              setCurrentAccount={setCurrentAccount}
            />

          </Grid.Col>
        </Grid>
      )}
    </>
  );
};

export default Dashboard;
