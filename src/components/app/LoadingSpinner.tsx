import React from "react";
import { ConfigProvider, Spin } from "antd";
import styles from "./LoadingSpinner.module.scss";

const LoadingSpinner: React.FC = () => (
  <div className={styles.wrapper}>
    <ConfigProvider
      theme={{
        components: {
          Spin: {
            dotSizeLG: 80,
          },
        },
      }}
    >
      <Spin size="large"></Spin>
    </ConfigProvider>
  </div>
);

export default LoadingSpinner;
