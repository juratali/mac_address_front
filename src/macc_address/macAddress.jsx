import axios from "axios";
import { useEffect, useState } from "react";

const api_url = "http://localhost:9090/mac_address";

const App2 = () => {
  const [maccAddress, setMaccAddress] = useState(null);

  useEffect(() => {
    axios
      .get(api_url)
      .then((res) => {
        setMaccAddress(res.data.maccAddress);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="flex gap-[10px] text-[20px]">
        <h1>Your mac address is:</h1>{" "}
        <h1 className="font-bold text-red-600">
          {maccAddress ? maccAddress : "Aniqlanmadi!"}
        </h1>
      </div>
    </div>
  );
};

export default App2;
