import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:8080");

function App1() {
  const [message, setmessage] = useState("");
  const [messageReceived, setmessageReceived] = useState("");
  const sendMessage = () => {
    socket.emit("send_message", { message });
    document.querySelector("input").value = "";
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setmessageReceived(data.message);
    });
    return () => {
      socket.off("receive_message");
    };
  }, []);

  return (
    <>
      <div className="flex items-center justify-center p-36 flex-col">
        <input
          placeholder="Message..."
          type="text"
          onChange={(e) => setmessage(e.target.value)}
          className="border-2 border-tahiti-600 rounded-lg p-2 mb-3 w-96"
        />
        <button
          onClick={sendMessage}
          className=" border-2 border-tahiti-600 rounded-lg p-[0.35rem]"
        >
          Send Message
        </button>
        <div className="flex tems-center justify-center p-20 flex-col">
          <h1>Messages:</h1>
          {messageReceived}
        </div>
      </div>
    </>
  );
}

export default App1;
