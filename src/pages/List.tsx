import { IonIcon, IonItem, IonList } from "@ionic/react";
import {
  americanFootball,
  basketball,
  beer,
  bluetooth,
  boat,
  build,
  flask,
  football,
  paperPlane,
  wifi
} from "ionicons/icons";
import React from "react";
import { Layout } from "../components/UI/Layout";

const ListPage: React.FC = () => {
  return (
    <Layout title="List">
      <ListItems />
    </Layout>
  );
};

const ListItems = () => {
  const icons = [
    flask,
    wifi,
    beer,
    football,
    basketball,
    paperPlane,
    americanFootball,
    boat,
    bluetooth,
    build
  ];

  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(x => {
    return (
      <IonItem key={x}>
        <IonIcon icon={icons[x - 1]} slot="start" />
        Item {x}
        <div className="item-note" slot="end">
          This is item # {x}
        </div>
      </IonItem>
    );
  });

  return <IonList>{items}</IonList>;
};

export default ListPage;
