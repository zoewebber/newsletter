import { useState, FormEvent } from "react";
import Button from "../components/button";
import Input from "../components/input";
import Popup, { IMessage } from "../components/popup";
import Title from "../components/title";
import Form from "../components/form";
import getApiUrl from "../utils/getApiUrl";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<IMessage | undefined>(undefined);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    fetch(getApiUrl("/subscription"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
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
            text: "Subscribed",
            ...json,
          });
        }
        setEmail("");
      })
      .catch((error) => console.log({ error }));
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Title>Newsletter</Title>
        <Input label="Email" value={email} onChange={setEmail} />
        <Button className="mb-10 mx-auto mt-5">Join</Button>
      </Form>
      <Popup message={message} />
    </>
  );
};

export default Subscribe;
