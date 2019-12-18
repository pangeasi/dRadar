import React from "react";
import { UserData } from "blockstack/lib/auth/authApp";
import { logOut } from "ionicons/icons";
import { IonButton, IonIcon } from "@ionic/react";
import { useApi } from "../hooks/Api";

type Props = {
  user: UserData;
};

export const Profile = ({ user }: Props) => {
  const { session } = useApi();
  return (
    <div>
      <IonButton size="small" onClick={() => session.signUserOut("/")}>
        <IonIcon icon={logOut} />
      </IonButton>{" "}
      {user.username.split(".id.blockstack")[0]}
    </div>
  );
};
