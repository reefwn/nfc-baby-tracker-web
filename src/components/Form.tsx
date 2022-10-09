import { createForm } from "@felte/solid";
import { validator } from "@felte/validator-yup";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  SimpleOption,
  SimpleSelect,
  VStack,
} from "@hope-ui/solid";
import { useLocation, useNavigate } from "@solidjs/router";
import axios from "axios";
import dayjs from "dayjs";
import { For } from "solid-js";
import type { InferType } from "yup";
import { object, string } from "yup";
import { ACTIVITY_TYPES } from "./../constant/activity.enum";

const schema = object({
  id: string().uuid().required(),
  activity: string().oneOf(ACTIVITY_TYPES).required(),
  date: string().required(),
  time: string().required(),
});

export function Form() {
  const location = useLocation();
  const navigate = useNavigate();

  const { form, errors, data, isValid, setFields } = createForm<
    InferType<typeof schema>
  >({
    extend: validator({ schema }),
    onSubmit: async (values) => {
      const time = dayjs(`${values.date} ${values.time}`).toDate();
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/activities`,
        {
          baby_id: values.id,
          type: values.activity,
          time,
        },
        {
          headers: {
            Authorization: `${import.meta.env.VITE_X_API_KEY}`,
          },
        }
      );
      if (response.status === 200)
        navigate(`/view?id=${values.id}`, { replace: true });
    },
  });

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
    <VStack
      as="form"
      ref={form}
      spacing="$5"
      alignItems="stretch"
      width="100%"
      maxW="$96"
      padding="$4"
    >
      <FormControl required invalid={!!errors("id")}>
        <FormLabel>ID</FormLabel>
        <Input type="text" name="id" value={location.query.id} />
        <FormErrorMessage>{errors("id")}</FormErrorMessage>
      </FormControl>
      <FormControl required invalid={!!errors("activity")}>
        <FormLabel>Activity</FormLabel>
        <SimpleSelect
          placeholder="Choose an activity"
          onChange={(value) => setFields("activity", value)}
        >
          <For each={ACTIVITY_TYPES}>
            {(item) => <SimpleOption value={item}>{item}</SimpleOption>}
          </For>
        </SimpleSelect>
        <FormErrorMessage>{errors("activity")}</FormErrorMessage>
      </FormControl>
      <FormControl required invalid={!!errors("date")}>
        <FormLabel>Date</FormLabel>
        <Input
          type="date"
          name="date"
          // value={new Date().toISOString().substring(0, 10)}
          value={dayjs().format("YYYY-MM-DD")}
        />
        <FormErrorMessage>{errors("date")}</FormErrorMessage>
      </FormControl>
      <FormControl required invalid={!!errors("time")}>
        <FormLabel>Time</FormLabel>
        <Input
          type="time"
          name="time"
          // value={new Date().toISOString().substring(11, 16)}
          value={dayjs().format("HH:mm")}
        />
        <FormErrorMessage>{errors("time")}</FormErrorMessage>
      </FormControl>
      <HStack justifyContent="flex-end">
        <Button type="submit" disabled={!isValid()}>
          Submit
        </Button>
      </HStack>
    </VStack>
  );
}
