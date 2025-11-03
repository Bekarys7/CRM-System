import { AuthenticateUser, getUserData } from "../../api/authApi";
import { useEffect, useState } from "react";
import type { Profile } from "../../types/Auth.types";

const ProfilePage: React.FC = () => {
  const [data, setdata] = useState<Profile | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      // Получаем токен
      const tokenn = await AuthenticateUser({
        login: "cwtsh",
        password: "123456",
      });

      // Сохраняем токен в состояние

      // Используем полученное (свежее) значение токена для запроса
      const userData = await getUserData(tokenn?.accessToken);

      setdata(userData);
      console.log(userData);
    };

    fetchData();
  }, []);

  return (
    <>
      <div>{data ? JSON.stringify(data) : "Загрузка..."}</div>;
    </>
  );
};

export default ProfilePage;
