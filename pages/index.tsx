import Head from "next/head";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSocket } from "../src/lib/hooks/use-socket";
import { IMessage } from "../src/lib/entities/message";

const Home: FC = () => {
  const [username, setUsername] = useState<string>();
  const [messages, setMessages] = useState<IMessage[]>([]);

  const socket = useSocket();
  const form = useForm();

  useEffect(() => {
    socket.on("finalMsg", (data: IMessage) => {
      setMessages([...messages, data]);
    });
  }, [messages]);

  const handleUsernameSave = () => {
    setUsername(form.getValues("username"));
  }

  const handleSendMsg = () => {
    const msg = form.getValues("msg");

    socket.emit("clientMsg", { username, text: msg }, (response: any) => {
      console.log(response);
    });
  }

  return (
    <>
      <Head>
        <title>Socket chat</title>
      </Head>
      <main>
        <label>
          Username:
          <input {...form.register("username")} type="text"/>
          <button onClick={() => handleUsernameSave()}>Save</button>
        </label>
        <section>
          <ul>
            {
              messages.map((message, index) => {
                return (
                  <li key={index}>
                    {message.username}: {message.text}
                  </li>
                );
              })
            }
          </ul>
          <label>
            Message:
            <input {...form.register("msg")} type="text"/>
          </label>
          <button onClick={() => handleSendMsg()}>Send</button>
        </section>
      </main>
    </>
  );
};

export default Home;

