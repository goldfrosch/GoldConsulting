import React from "react";

import UserChat from "components/chat/user/main";
import AdminChat from "components/chat/admin/main";
import IChatUserList from "constants/chatAdminUserList";

interface AppProps {}
const App: React.FC<AppProps> = () => {
  return (
    <div>
      <div style={{ width: "80%", height: "80vh" }}>
        <AdminChat userList={IChatUserList} />
      </div>
      <UserChat title="하이 ㅋㅋ" />
    </div>
  );
};

export default App;
