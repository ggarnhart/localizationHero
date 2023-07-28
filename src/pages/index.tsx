import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [translated, setTranslated] = useState({} as any);
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen text-black bg-gray-100">
      <h2 className="text-lg">Translate</h2>
      <h5 className="mb-4 text-sm">It's on my dime. Be careful</h5>

      <input
        className="px-4 py-2 text-xl text-black duration-200 ease-in-out bg-white rounded outline-none ring-none focus:shadow"
        type="text"
        id="input"
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={async () => {
          setLoading(true);
          try {
            let { data } = await axios.post("/api/localize", {
              prompt: text,
            });
            setTranslated(data);
          } catch (e: any) {
            console.log(e);
            alert(e.response.data.error);
          }
          setLoading(false);
        }}
        className="px-4 py-2 mt-4 text-lg text-white duration-200 ease-in-out bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        disabled={text === "" || text === null || text === undefined}
      >
        {loading ? "Loading..." : "Translate"}
      </button>

      {Object.keys(translated).length > 0 && (
        <div>
          {Object.keys(translated).map((key) => {
            return (
              <div>
                {key}: {translated[key]}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
