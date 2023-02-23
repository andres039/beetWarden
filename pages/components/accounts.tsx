import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Center,
  Divider,
  Footer,
  Navbar,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { Avatar } from "@mantine/core";
import { useQuery } from "../../convex/_generated/react";
import { useAuth0 } from "@auth0/auth0-react";

const Accounts = ({ setCurrentAccount, setInputsDisabled }) => {
  const { user } = useAuth0();

  const name = user.given_name
    ? `${user.given_name}  ${user.family_name}`
    : "Anonymus user";

  const accounts = useQuery("listAccounts") || [
    { name: "", username: "", password: "", id: "0", url: "", owner_id: "" },
  ];
  // const setAccount = (id: string) => {

  //     const selectedAccount = accounts.find(
  //       (oneAccount) => id === oneAccount._id.toString()
  //     );
  //     console.log('selected', selectedAccount)
  //     setCurrentAccount(selectedAccount);

  // };

  useEffect(() => setCurrentAccount(accounts[0]), []);

  const createNewAccount = () => {
    setCurrentAccount({
      name: "",
      username: "",
      password: "",
      url: "",
      owner_id: "",
    });
    setInputsDisabled(false);
  };
  function LogoutButton() {
    const { logout } = useAuth0();
    return (
      <Button
        variant="gradient"
        gradient={{ from: "orange", to: "red" }}
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        Log out
      </Button>
    );
  }
  return (
    <Card style={{ minWidth: "90%", maxHeight: "100vh", paddingTop: "6vh" }}>
      <Navbar.Section
        grow
        component={ScrollArea}
        mx="-xs"
        px="xs"
        style={{ padding: 12 }}
      >
        <Stack>
          <Center>
            <Avatar
              src={user.picture || null}
              alt="it's me"
              radius="xl"
              size="lg"
            />
          </Center>
          <Center>
            <Text>{name} </Text>
          </Center>
          <Divider />
          <Center>
            <Button
              variant="gradient"
              gradient={{ from: "teal", to: "lime", deg: 105 }}
              onClick={createNewAccount}
            >
              Add Account
            </Button>
          </Center>
        </Stack>
      </Navbar.Section>

      <Navbar.Section component={ScrollArea}>
        <Card withBorder>
          <Stack>
            {accounts.map((account) => (
              <>
                <Button
                  variant="subtle"
                  key={account._id}
                  onClick={() => {
                    setAccount(account._id.toString());
                    setInputsDisabled(true);
                  }}
                >
                  {account.name}
                </Button>
              </>
            ))}
          </Stack>
        </Card>
      </Navbar.Section>
      <Navbar.Section>
        <Center style={{ padding: 20 }}>
          <LogoutButton />
        </Center>
      </Navbar.Section>
    </Card>
  );
};

export default Accounts;
