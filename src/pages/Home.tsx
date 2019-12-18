import React, { useState } from "react";
import "./Home.css";
import { Layout } from "../components/UI/Layout";
import { IonButton, IonInput } from "@ionic/react";

const HomePage: React.FC = () => {
  const [input, setInput] = useState("");
  const create = (data: any) => {
    return fetch("/.netlify/functions/add-user", {
      body: JSON.stringify(data),
      method: "POST"
    }).then(response => {
      return response.json();
    });
  };

  return (
    <Layout title="Home">
      <div>
        <IonInput onIonChange={e => setInput(e.detail.value || "")} />
        <IonButton
          onClick={() => {
            input && create({ user: input });
            setInput("");
          }}
        >
          create-user
        </IonButton>
      </div>
    </Layout>
  );
};

export default HomePage;
