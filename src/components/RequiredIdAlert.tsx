import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@hope-ui/solid";
import { Component } from "solid-js";

const RequiredIdAlert: Component = () => {
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
};

export default RequiredIdAlert;
