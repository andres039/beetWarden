import React, { useState } from "react";
import AccountInfo from "./accountInfo";
import Accounts from "./Navbar";
import { Burger, Center, Divider, Group, Stack, Text } from "@mantine/core";

const Mobile = ({
  currentAccount,
  inputsDisabled,
  setInputsDisabled,
  setCurrentAccount,
}) => {
  const [opened, setOpened] = useState(false);
  return (
    <Center>
      <Stack m="0">
        <Group p={30} position="apart" miw={"100vw"}>
          <Text>BeetWarden</Text>
          <Burger opened={opened} onClick={() => setOpened((o) => !o)} />
        </Group>
        <Divider orientation="horizontal" />
        {opened ? (
          <Accounts
            setCurrentAccount={setCurrentAccount}
            setInputsDisabled={setInputsDisabled}
            setOpened={setOpened}
          />
        ) : (
          <AccountInfo
            currentAccount={currentAccount}
            inputsDisabled={inputsDisabled}
            setInputsDisabled={setInputsDisabled}
          />
        )}
      </Stack>
    </Center>
  );
};

export default Mobile;
