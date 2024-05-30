import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import KubanBoard from "./components/KubanBoard";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <KubanBoard />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
