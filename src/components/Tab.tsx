import { Button } from "antd";
import styles from "../components/Tab.module.scss";

type TabsProps = {
  children: React.ReactNode;
  onChange: () => void;
  isSelected: boolean;
};

const Tabs: React.FC<TabsProps> = ({ children, onChange, isSelected }) => {
  return (
    <>
      <div className={styles.wrapper}>
        <Button
          type="text"
          onClick={onChange}
          className={`${styles.btnNoBg} ${isSelected ? styles.active : ""}`}
        >
          {children}
        </Button>
      </div>
    </>
  );
};
export default Tabs;
