import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Center,
  Group,
  Stack,
  Text,
  TextInput,
  CopyButton,
} from "@mantine/core";

import { useMutation, useQuery } from "../../convex/_generated/react";

const AccountInfo = ({
  currentAccount,
  inputsDisabled,
  setCurrentAccount,
  setInputsDisabled,
}) => {
  const [currentAccountInfo, setCurrentAccountInfo] = useState(currentAccount);
  const toggleInputs = () => setInputsDisabled(!inputsDisabled);
  const addAccount = useMutation("addAccount");
  const deleteAccount = useMutation("deleteAccount");
  const accounts = useQuery("listAccounts") || [
    { name: "", username: "", password: "", id: "0", url: "", owner_id: "" },
  ];
  const editAccountInfo = async () => {
    if (!inputsDisabled) {
      const add = await addAccount(currentAccountInfo);
    }
  };
  const cancel = () => {
    setCurrentAccountInfo(accounts[0]);
    setInputsDisabled(true);
  };
  const deleteAccountButton = () => {
    deleteAccount(currentAccount._id);
    setCurrentAccountInfo(accounts[0]);
  };

  useEffect(() => {
    setCurrentAccountInfo(currentAccount);
  }, [currentAccount]);

  return currentAccountInfo ? (
    <Center style={{ maxWidth: "100vw", height: "100vh" }}>
      <Card withBorder style={{ minWidth: "80%", paddingBottom: 38 }}>
        <Container>
          <Group position="apart" mt="md" mb="xs">
            <Text weight={800}>{currentAccountInfo.name}</Text>
            <Group>
              <Button
                variant="subtle"
                onClick={() => {
                  toggleInputs();
                  editAccountInfo();
                }}
              >
                {" "}
                {inputsDisabled ? "Edit" : "Save changes"}{" "}
              </Button>
              {!inputsDisabled && (
                <Button variant="subtle" color="red" onClick={cancel}>
                  Cancel
                </Button>
              )}
            </Group>
          </Group>
          {}
          <Stack spacing="lg">
            <Group align="end">
              <TextInput
                disabled={inputsDisabled}
                label="Account name"
                onChange={(e) =>
                  setCurrentAccountInfo({
                    ...currentAccountInfo,
                    name: e.target.value,
                  })
                }
                placeholder={currentAccount.name}
                value={currentAccountInfo.name}
                style={{ minWidth: "85%" }}
              />
              <CopyButton value={currentAccount.username}>
                {({ copied, copy }) => (
                  <Button color={copied ? "teal" : "blue"} onClick={copy}>
                    {copied ? "Copied" : "Copy"}
                  </Button>
                )}
              </CopyButton>
            </Group>
            <Group align="end">
              <TextInput
                disabled={inputsDisabled}
                label="Username"
                onChange={(e) =>
                  setCurrentAccountInfo({
                    ...currentAccountInfo,
                    username: e.target.value,
                  })
                }
                placeholder={currentAccount.username}
                value={currentAccountInfo.username}
                style={{ minWidth: "85%" }}
              />
              <CopyButton value={currentAccountInfo.username}>
                {({ copied, copy }) => (
                  <Button color={copied ? "teal" : "blue"} onClick={copy}>
                    {copied ? "Copied" : "Copy"}
                  </Button>
                )}
              </CopyButton>
            </Group>
            <Group align="end">
              <TextInput
                placeholder={currentAccount.password}
                label="Password"
                disabled={inputsDisabled}
                onChange={(e) =>
                  setCurrentAccountInfo({
                    ...currentAccountInfo,
                    password: e.target.value,
                  })
                }
                style={{ minWidth: "85%" }}
                value={currentAccountInfo.password}
              ></TextInput>
              <CopyButton value={currentAccount.password}>
                {({ copied, copy }) => (
                  <Button color={copied ? "teal" : "blue"} onClick={copy}>
                    {copied ? "Copied" : "Copy"}
                  </Button>
                )}
              </CopyButton>
            </Group>
            <Group align="end">
              <TextInput
                placeholder={currentAccount.url}
                label="URL"
                disabled={inputsDisabled}
                onChange={(e) =>
                  setCurrentAccountInfo({
                    ...currentAccountInfo,
                    url: e.target.value,
                  })
                }
                style={{ minWidth: "85%" }}
                value={currentAccountInfo.url}
              ></TextInput>
              <CopyButton value={currentAccount.url}>
                {({ copied, copy }) => (
                  <Button color={copied ? "teal" : "blue"} onClick={copy}>
                    {copied ? "Copied" : "Copy"}
                  </Button>
                )}
              </CopyButton>
            </Group>
            <Center>
              <Button
                variant="subtle"
                color="red"
                onClick={() => deleteAccountButton()}
              >
                Delete Account
              </Button>
            </Center>
          </Stack>
        </Container>
      </Card>
    </Center>
  ) : (
    <Center>
      {" "}
      <Text>Welcome, add an account please!</Text>{" "}
    </Center>
  );
};

export default AccountInfo;
