import React, { useState } from "react";
import AccountInfo from "./accountInfo";
import Accounts from "./accounts";
import { Burger, Divider, Group, Stack, Text } from "@mantine/core";

const Mobile = ({
  currentAccount,
  inputsDisabled,
  setInputsDisabled,
  setCurrentAccount,
}) => {
  const [opened, setOpened] = useState(false);
  return (
    <Stack>
      <Group p={30} position="apart" sx={{minWidth: "60vh"}}>
        <Text>BeetWarden</Text>
        <Burger opened={opened} onClick={() => setOpened((o) => !o)} />
      </Group>
      <Divider orientation="horizontal" />
      {opened ? (
        <Accounts
          setCurrentAccount={setCurrentAccount}
          setInputsDisabled={setInputsDisabled}
        />
      ) : (
        <AccountInfo
          currentAccount={currentAccount}
          inputsDisabled={inputsDisabled}
          setInputsDisabled={setInputsDisabled}
          setCurrentAccount={setCurrentAccount}
        />
      )}
    </Stack>
  );
};

export default Mobile;
