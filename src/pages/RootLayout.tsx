import { Outlet } from "react-router-dom";
import SideMenu from "../components/SideNavigation";
import { Layout } from "antd";

const { Sider, Content } = Layout;

function RootLayout() {
  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <Sider style={{ backgroundColor: "#F5F5F5", marginBottom: "51rem" }}>
          <SideMenu />
        </Sider>

        <Layout style={{}}>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
export default RootLayout;
