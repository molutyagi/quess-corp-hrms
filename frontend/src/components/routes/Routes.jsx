import { createBrowserRouter } from "react-router-dom";
import EmployeesList from "../employees/EmployeesList";
import App from "../../App";

const routes = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      { path: "/employees", element: <EmployeesList /> },
    ],
  },
]);

export default routes;
