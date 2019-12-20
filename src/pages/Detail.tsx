import React, { useEffect, useState } from "react";
import { Layout } from "../components/UI/Layout";
import { RouteComponentProps } from "react-router";
import { searchApiTMDB, createData } from "../utils/functionsAPI";
import { IonText, IonButton } from "@ionic/react";
import { useApi } from "../hooks/Api";

type MediaType = "movie" | "tv" | "person";
const redirect = () => (document.location.href = "/");
const DetailPage = ({
  match
}: RouteComponentProps<{ id: string; mediaType: MediaType }>) => {
  const [data, setData] = useState();
  const { user, session } = useApi();
  useEffect(() => {
    if (
      !["movie", "tv", "person"].includes(match.params.mediaType) ||
      !+match.params.id
    ) {
      redirect();
    } else {
      searchApiTMDB(match.params.id, match.params.mediaType).then(data => {
        createData(
          {
            id: match.params.id,
            users: {
              [user]: {}
            }
          },
          match.params.mediaType
        );
        setData(data);
      });
    }
  }, [match.params.id, match.params.mediaType, user]);

  if (
    !["movie", "tv", "person"].includes(match.params.mediaType) ||
    !+match.params.id
  )
    redirect();

  session
    .getFile(`${match.params.mediaType}/${match.params.id}`, {
      decrypt: false
    })
    .then(data => console.log(JSON.parse(data.toString())))
    .catch(() => {});

  return (
    <Layout title="Detail">
      {data && (
        <div>
          <div>{match.params.id}</div>
          <div>
            <img
              alt="backdrop media"
              src={`https://image.tmdb.org/t/p/w500/${data.backdrop_path}`}
            />
          </div>
          <div>
            <IonText>{data.name || data.title}</IonText>
          </div>
          <div>
            <IonText>{data.overview}</IonText>
          </div>
          <div>
            <IonButton
              onClick={() => {
                session.putFile(
                  `${match.params.mediaType}/${match.params.id}`,
                  JSON.stringify(data),
                  { encrypt: false }
                );
              }}
            >
              save
            </IonButton>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default DetailPage;
