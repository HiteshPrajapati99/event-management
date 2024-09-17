import { Toaster } from "sonner";
import Router from "./routes";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
      <Toaster richColors position="top-right" duration={3000} closeButton />
    </>
  );
};

export default App;
