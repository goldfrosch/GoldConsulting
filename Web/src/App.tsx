import React from "react";

import origin from "assets/origin.jpg";
import UserChat from "components/chat/user/main";

interface AppProps {}
const App: React.FC<AppProps> = () => {
  return (
    <div>
      <img src={origin} alt="logo" />
      <UserChat title="하이 ㅋㅋ" />
    </div>
  );
};

export default App;
