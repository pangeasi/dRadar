import { getLambda } from "./lambda";
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

export const searchApiTMDB = async (
  term: string,
  type: "multi" | "movie" | "tv" | "person"
) => {
  return fetch(getLambda(`tmdb-search`), {
    method: "POST",
    body: JSON.stringify({
      type,
      term
    })
  })
    .then(response => response.json())
    .then(data => Promise.resolve(data.results || data));
};

export const createData = (data: any, classes: string) => {
  return fetch(getLambda("create-data"), {
    body: JSON.stringify({
      data,
      classes
    }),
    method: "POST"
  }).then(response => {
    return response.json();
  });
};
