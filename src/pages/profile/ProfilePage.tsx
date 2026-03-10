import { Button, notification } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { logout } from "../../store/authActions";

const ProfilePage: React.FC = () => {
  const userData = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logout());
    } catch (e) {
      notification.error({ message: "error logout", description: `${e}` });
    }
  };

  return (
    <>
      <div>
        <p>Username:{userData?.data?.username}</p>
        <p>Email:{userData?.data?.email}</p>
        <p>
          Phone Number:
          {userData?.data?.phoneNumber || "there isnt phone number"}
        </p>
      </div>
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
};

export default ProfilePage;
