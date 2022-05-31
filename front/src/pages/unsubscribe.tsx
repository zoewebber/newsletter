import Form from "../components/form";
import Title from "../components/title";
import Button from "../components/button";
import Popup from "../components/popup";
import { FormEvent, useState } from "react";
import { IMessage } from "../components/popup";
import { useSearchParams } from "react-router-dom";
import getApiUrl from "../utils/getApiUrl";

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState<IMessage>();

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const id = searchParams.get("id");
    fetch(getApiUrl(`/subscription/${id}`), { method: "DELETE" })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          setMessage({
            type: "ERROR",
            text: json.error,
          });
        } else {
          setMessage({
            type: "SUCCESS",
            text: "Unsubscribed",
            ...json,
          });
        }
      })
      .catch((error) => console.log({ error }));
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Title>Unsubscribe</Title>
        <Button className="my-5 mx-auto">Confirm</Button>
      </Form>
      <Popup message={message} />
    </>
  );
};

export default Unsubscribe;
