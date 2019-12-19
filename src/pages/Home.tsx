import React, { useState } from "react";
import "./Home.css";
import { Layout } from "../components/UI/Layout";
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonSearchbar,
  IonList,
  IonText
} from "@ionic/react";
import { getLambda } from "../utils/lambda";

const HomePage: React.FC = () => {
  const [input, setInput] = useState("");
  const [dataSearch, setDataSearch] = useState([]);

  const create = (data: any) => {
    return fetch(getLambda("add-user"), {
      body: JSON.stringify(data),
      method: "POST"
    }).then(response => {
      return response.json();
    });
  };

  const searchApi = async (term: string) => {
    if (term) {
      fetch(getLambda(`tmdb-multi-search?term=${term}`))
        .then(response => response.json())
        .then(data => setDataSearch(data.results));
    }
  };
  console.log(dataSearch);

  return (
    <Layout title="Home">
      <div>
        <IonItem>
          <IonLabel position="floating">Set a user</IonLabel>
          <IonInput
            placeholder="User"
            value={input}
            onIonChange={e => setInput(e.detail.value || "")}
          />
        </IonItem>
        <IonButton
          disabled={!input}
          onClick={() => {
            input && create({ user: input });
            setInput("");
          }}
        >
          create-user
        </IonButton>
        <IonItem>
          <IonSearchbar onIonChange={e => searchApi(e.detail.value || "")} />
        </IonItem>
        <IonList>
          {dataSearch.map((result: any) => (
            <IonItem key={result.id}>
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
