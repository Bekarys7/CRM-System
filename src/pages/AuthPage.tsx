import React from "react";
import { Button, Card, Flex, Typography } from "antd";

const cardStyle: React.CSSProperties = {
  width: 620,
  margin: "0 auto",
};

const imgStyle: React.CSSProperties = {
  display: "block",
  width: 273,
};

const AuthPage: React.FC = () => (
  <div style={{ display: "flex", alignItems: "center", minHeight: "100wh" }}>
    <Card
      hoverable
      style={cardStyle}
      styles={{ body: { padding: 0, overflow: "hidden" } }}
    >
      <Flex justify="center">
        <img
          draggable={false}
          alt="avatar"
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          style={imgStyle}
        />
        <Flex
          vertical
          align="flex-end"
          justify="space-between"
          style={{ padding: 32 }}
        >
          <Typography.Title level={3}>
            “antd is an enterprise-class UI design language and React UI
            library.”
          </Typography.Title>
          <Button type="primary" href="https://ant.design" target="_blank">
            Get Started
          </Button>
        </Flex>
      </Flex>
    </Card>
  </div>
);

export default AuthPage;
