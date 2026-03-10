import { RouterProvider } from "react-router-dom";
import { App as AntdApp } from "antd";
import router from "./router";

function App() {
  console.log("App component rendered");
  return (
    <AntdApp>
      <RouterProvider router={router} />
    </AntdApp>
  );
}

export default App;
