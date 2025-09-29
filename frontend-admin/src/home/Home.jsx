import React from "react";
// import { sessionCheck, sessionCheckApi } from "../services/session.service";

function Home() {
  // const handleSession = async () => {
  //   try {
  //     const check = await sessionCheckApi();
  // if (!check.ok) throw new Error(check.message);

  //     return;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div>
      <h1>Home</h1>
      {/* <button onClick={handleSession}>Click</button> */}
    </div>
  );
}

export default Home;
