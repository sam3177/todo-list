import { Dashboard } from "./Dashboard";
import { DashboardOutlined } from "@ant-design/icons";

export const DASHBOARD = {
  path: "/dashboard",
  component: Dashboard,
  roles:["ADMIN"],
  menu: {
    key: "Dashboard",
    label: "Dashboard",
    order: 0,
    icon: DashboardOutlined,
  },
};
