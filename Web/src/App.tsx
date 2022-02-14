import React from "react";

import UserChat from "components/chat/user/main";
import AdminChat from "components/chat/admin/main";

interface AppProps {}
const App: React.FC<AppProps> = () => {
  return (
    <div>
      <div style={{ width: "100vw", height: "100vh" }}>
        <AdminChat />
      </div>
      <UserChat title="하이 ㅋㅋ" />
    </div>
  );
};

export default App;
