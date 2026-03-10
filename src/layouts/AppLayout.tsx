import { Outlet } from "react-router-dom";
import SideNavigation from "../components/app/SideNavigation";
import { Layout } from "antd";

const { Sider, Content } = Layout;

function AppLayout() {
  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <Sider style={{ backgroundColor: "#F5F5F5" }}>
          <SideNavigation />
        </Sider>

        <Layout>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
export default AppLayout;
