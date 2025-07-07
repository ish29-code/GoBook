import { FaRobot } from "react-icons/fa";
import { useState } from "react";
import { IoClose, IoChatbubblesSharp } from "react-icons/io5";

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const send = async () => {
    if (!input.trim()) return;

    try {
      const res = await fetch("http://localhost:8080/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input }),
      });

      const data = await res.json();

      if (data.reply) {
        setLogs((prevLogs) => [...prevLogs, { user: input, reply: data.reply }]);
      } else {
        setLogs((prevLogs) => [
          ...prevLogs,
          { user: input, reply: "Sorry, I didn't understand that." },
        ]);
      }

      setInput("");
    } catch (error) {
      console.error("Server Error:", error);
      setLogs((prevLogs) => [
        ...prevLogs,
        { user: input, reply: "Something went wrong. Please try again later." },
      ]);
      setInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") send();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-80 shadow-lg border border-gray-300 bg-white rounded-xl overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 bg-blue-600 text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <FaRobot size={20} className="text-white" />
              <span className="font-semibold text-lg">GoAgent</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-gray-300">
              <IoClose size={22} />
            </button>
          </div>

          <div className="h-72 p-4 overflow-y-auto space-y-3 bg-gray-50 text-sm">
            {logs.map((log, index) => (
              <div key={index}>
                <div className="text-right">
                  <span className="inline-block bg-blue-100 text-blue-800 rounded-lg px-3 py-1 mb-1">
                    {log.user}
                  </span>
                </div>
                <div className="text-left">
                  <span className="inline-block bg-gray-200 text-gray-800 rounded-lg px-3 py-1">
                    {log.reply}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex border-t p-2 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask me anything..."
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={send}
              className="ml-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg"
      >
        <IoChatbubblesSharp size={24} />
      </button>
    </>
  );
}
