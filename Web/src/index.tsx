import ReactDOM from "react-dom";

import App from "App";
import GlobalStyle from "styles/Global";

import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <GlobalStyle />
    <App />
  </QueryClientProvider>,
  document.getElementById("root")
);
