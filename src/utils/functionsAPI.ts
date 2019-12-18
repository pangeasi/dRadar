import { UserSession } from "blockstack";
import { AppConfig } from "blockstack";
const appConfig = new AppConfig();
const session = new UserSession({ appConfig });

export const getFile = async (e: string) => {
  console.log(e);
  return new Promise(resolve => {
    session
      .getFile(e, {
        decrypt: false
      })
      .then(data => resolve(JSON.parse(data.toString())))
      .catch(err => resolve(null));
  });
};
