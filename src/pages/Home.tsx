import React from "react";
import "./Home.css";
import { Layout } from "../components/UI/Layout";
import { IonButton } from "@ionic/react";

const HomePage: React.FC = () => {
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
      <IonButton onClick={() => create({ user: "fitopato.id.blockstack" })}>
        create-user
      </IonButton>
    </Layout>
  );
};

export default HomePage;
