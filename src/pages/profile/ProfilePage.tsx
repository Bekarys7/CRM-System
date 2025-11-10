import { useEffect, useState } from "react";
import UserService from "../../services/user.service";
import type { Profile } from "../../types/Auth.types";
import { Button, notification } from "antd";
import { useAppDispatch } from "../../store/hooks/hooks";
import { logout } from "../../store/authActions";

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<Profile | null>();

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await UserService.getUserData();
      setUserData(data);
    };
    fetchUserData();
  }, []);
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
        <p>Username:{userData?.username}</p>
        <p>Email:{userData?.email}</p>
        <p>Phone Number:{userData?.phoneNumber || "there isnt phone number"}</p>
      </div>
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
};

export default ProfilePage;
