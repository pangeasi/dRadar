import { UserSession } from "blockstack";
import { AppConfig } from "blockstack";
export const useApi = () => {
  const appConfig = new AppConfig();
  const session = new UserSession({ appConfig });
  const user = session.loadUserData().username.split(".id")[0];
  return {
    session,
    user
  };
};
