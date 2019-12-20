import React, { useState } from "react";
import "./Home.css";
import { Layout } from "../components/UI/Layout";
import { IonItem, IonSearchbar, IonList, IonText } from "@ionic/react";
import { useHistory } from "react-router";
import { searchApiTMDB } from "../utils/functionsAPI";

const HomePage: React.FC = () => {
  const [dataSearch, setDataSearch] = useState([]);
  const history = useHistory();
  console.log(dataSearch);

  const setData = async (value: string) => {
    const res = await searchApiTMDB(value, "multi");
    setDataSearch(res);
  };

  return (
    <Layout title="Home">
      <div>
        <IonItem>
          <IonSearchbar
            debounce={1500}
            onKeyPress={e => console.log(e)}
            onIonChange={e => setData(e.detail.value || "")}
          />
        </IonItem>
        <IonList>
          {dataSearch.map((result: any) => (
            <IonItem
              key={result.id}
              onClick={() =>
                history.push(`/detail/${result.media_type}/${result.id}`)
              }
            >
              {result.poster_path ? (
                <img
                  alt={`poster ${result.title || result.name}`}
                  src={`https://image.tmdb.org/t/p/w92/${result.poster_path}`}
                  slot="start"
                />
              ) : (
                <div
                  style={{ width: 92, height: 138, background: "grey" }}
                  slot="start"
                ></div>
              )}
              <IonText slot="end">{result.title || result.name}</IonText>
            </IonItem>
          ))}
        </IonList>
      </div>
    </Layout>
  );
};

export default HomePage;
