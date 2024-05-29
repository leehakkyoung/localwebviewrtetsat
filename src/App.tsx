import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState<string>("");
  const [sendRnMessage, setSendRnMessage] = useState<string>("");

  const sendHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSendRnMessage(event.target.value);
  };

  const sendMessageToReactNative = () => {
    if (window?.ReactNativeWebView) {
      window?.ReactNativeWebView.postMessage(sendRnMessage);
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log("Received message from React Native:", event.data);
      setMessage(event.data);
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 300,
            height: 300,
            backgroundColor: "#eee",
            border: "1px solid #000",
            borderRadius: 20,
          }}
        >
          <p>web 화면</p>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 20,
            }}
          >
            <span>전달 받은 데이터</span>
            <input value={message} />
          </div>
          <div
            style={{
              marginTop: 30,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 20,
            }}
          >
            <input type="text" value={sendRnMessage} onChange={sendHandle} />
            <button
              onClick={sendMessageToReactNative}
              style={{ border: "1px solid #000" }}
            >
              RN 으로 전송
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
