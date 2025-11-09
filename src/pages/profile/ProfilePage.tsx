import { useEffect, useState } from "react";
import UserService from "../../services/user.service";
import type { Profile } from "../../types/Auth.types";

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<Profile | null>();

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await UserService.getUserData();
      setUserData(data);
    };
    fetchUserData();
  }, []);

  return (
    <>
      <div>{JSON.stringify(userData)}</div>
    </>
  );
};

export default ProfilePage;
