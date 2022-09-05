import Cookies from "js-cookie";

export const useSession = () => {
  const token = Cookies.get("token");
  return {
    isAuth: token,
    token,
  };
};
