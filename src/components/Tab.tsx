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
        <button
          className={(isSelected && styles.active) || undefined}
          onClick={onChange}
        >
          {children}
        </button>
      </div>
    </>
  );
};
export default Tabs;
