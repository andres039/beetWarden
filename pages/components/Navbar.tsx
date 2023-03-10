import React, { useEffect } from "react";
import {
  Button,
  Card,
  Center,
  Divider,
  Navbar,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { Avatar } from "@mantine/core";
import { useQuery } from "../../convex/_generated/react";
import { useAuth0 } from "@auth0/auth0-react";

const Accounts = ({ setCurrentAccount, setOpened, setInputsDisabled }) => {
  const { user } = useAuth0();
  const name = user.given_name
    ? `${user.given_name}  ${user.family_name}`
    : "Anonymus user";

  const accounts = useQuery("listAccounts");

  const setAccount = (id: string) => {
    const selectedAccount = accounts.find(
      (oneAccount) => id === oneAccount._id.toString()
    );

    setCurrentAccount(selectedAccount);
    setOpened(false);
  };

  useEffect(() => accounts && setCurrentAccount(accounts[0]), [accounts]);

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
    <Card
      style={{
        minWidth: "80%",
        minHeight: "100vh",
        paddingTop: "6vh",
        backgroundColor: "cornsilk",
      }}
      shadow="xl"
    >
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
        <Stack>
          {accounts &&
            accounts.map((account) => (
              <>
                <Button
                  variant="subtle"
                  key={account._id.toString()}
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
