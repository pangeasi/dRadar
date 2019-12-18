import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle
} from "@ionic/react";
import React from "react";
import { SignIn } from "../SignIn";

type Props = {
  title: string;
};
export const Header = ({ title }: Props) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>{title}</IonTitle>
        <SignIn />
      </IonToolbar>
    </IonHeader>
  );
};
