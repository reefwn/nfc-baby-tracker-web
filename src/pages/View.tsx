import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  Flex,
  List,
  Text,
  VStack,
} from "@hope-ui/solid";
import { useLocation } from "@solidjs/router";
import axios from "axios";
import dayjs from "dayjs";
import { TbAlarm, TbBed, TbMilk, TbPoo } from "solid-icons/tb";
import { Component, createResource, For } from "solid-js";
import { IActivity } from "../interfaces/activity";
import styles from "./../App.module.css";

const View: Component = () => {
  const location = useLocation();

  const fetchData = async (): Promise<IActivity[]> => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/activities/${location.query.id}/latest`,
      {
        headers: {
          Authorization: `${import.meta.env.VITE_X_API_KEY}`,
        },
      }
    );

    if (response.status === 200) return response.data;
    return [];
  };

  const [data] = createResource("data", fetchData);

  const renderIcon = (type: string) => {
    if (type === "SLEEP")
      return <TbBed size={24} color="$primary9" title="bed" />;
    if (type === "AWAKE")
      return <TbAlarm size={24} color="$primary9" title="alarm" />;
    if (type === "POO")
      return <TbPoo size={24} color="$primary9" title="poo" />;
    if (type === "FEED")
      return <TbMilk size={24} color="$primary9" title="milk" />;

    return <></>;
  };

  const color = (type: string) => {
    if (type === "SLEEP") return "$primary";
    if (type === "AWAKE") return "$accent";
    if (type === "POO") return "$success";
    if (type === "FEED") return "$info";

    return "$neutral";
  };

  if (!location.query.id)
    return (
      <Alert
        status="danger"
        variant="subtle"
        flexDirection="column"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon boxSize="40px" mr="0" />
        <AlertTitle mt="$4" mb="$1" fontSize="$lg">
          This page required ID!
        </AlertTitle>
        <AlertDescription maxWidth="$sm">
          Thanks for interested in this project.
        </AlertDescription>
      </Alert>
    );

  return (
    <div class={styles.body}>
      <VStack
        spacing="$5"
        alignItems="stretch"
        width="100%"
        maxW="$96"
        padding="$4"
      >
        <For each={data()}>
          {(d, i) => {
            return (
              <List spacing="$3">
                <Box
                  bg="white"
                  w="100%"
                  p="$4"
                  borderWidth="1px"
                  borderRadius="$md"
                  borderColor={`${color(d.type)}9`}
                  bgColor={`${color(d.type)}3`}
                  color={`${color(d.type)}9`}
                >
                  <Flex justifyContent="space-between">
                    <Center>{renderIcon(d.type)}</Center>
                    <Center>
                      <Text>{d.type}</Text>
                    </Center>
                    <Center>
                      <Text>{dayjs(d.time).format("DD-MM-YYYY")}</Text>
                    </Center>
                    <Center>
                      <Text>{dayjs(d.time).format("HH:mm")}</Text>
                    </Center>
                  </Flex>
                </Box>
              </List>
            );
          }}
        </For>
      </VStack>
    </div>
  );
};

export default View;
