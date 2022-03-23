import Head from "next/head";
import { FC, FormEvent, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSocket } from "../src/lib/hooks/use-socket";
import { IMessage } from "../src/lib/entities/message";

const Home: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [buffer, setBuffer] = useState<IMessage>();

  const socket = useSocket();
  const form = useForm();

  const receiveMessage = useCallback((data: IMessage) => {
    setMessages([...messages, data]);
  }, [messages]);

  useEffect(() => {
    socket.on("finalMsg", setBuffer);
  }, []);

  useEffect(() => {
    if(buffer != undefined) {
      receiveMessage(buffer!);
    }
  }, [buffer])

  const handleUsernameSave = (e: FormEvent) => {
    e.preventDefault();

    setUsername(form.getValues("username"));
  }

  const handleSendMsg = (e: FormEvent) => {
    e.preventDefault();

    const msg = form.getValues("msg");
    if (msg.replace(/\s+/g, '') != "") {
      socket.emit("clientMsg", { username, text: msg });
      form.setValue("msg", "");
    }
  }

  return (
    <>
      <Head>
        <title>Socket chat</title>
      </Head>
      <main>
        {username == "" ?
          <form onSubmit={(e) => handleUsernameSave(e)}>
            <label>
              <span>Username:</span>
              <input {...form.register("username")} type="text"/>
            </label>
            <button type="submit">Save</button>
          </form>
          :
          <section>
            <div className="messages">
              <ul>
                {
                  messages.map((message, index) => {
                    return (
                      <li key={index}>
                        <span className="message__author">{message.username}:</span> {message.text}
                      </li>
                    );
                  })
                }
              </ul>
            </div>
            <form className="w-full" onSubmit={(e) => handleSendMsg(e)}>
              <input {...form.register("msg")} type="text" placeholder="Text..."/>
              <button type="submit">Send</button>
            </form>
          </section>
        }
      </main>
    </>
  );
};

export default Home;

