import RouterProvider from "./router/Router";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";

export default function App(): React.ReactElement {
  return (
    <>
      <div>
        <Toaster />
      </div>
      <ErrorBoundary fallback={<div>Something went wrong!</div>}>
        <RouterProvider />
      </ErrorBoundary>
    </>
  );
}
