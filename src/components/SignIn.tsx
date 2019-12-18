import { useApi } from "../hooks/Api";
import { useHistory } from "react-router";
import { useEffect } from "react";
import React from "react";
import { Profile } from "./Profile";
import { IonButton, IonIcon } from "@ionic/react";
import { logIn } from "ionicons/icons";

export const SignIn = () => {
  const { session } = useApi();
  const history = useHistory();
  useEffect(() => {
    if (session.isSignInPending()) {
      session.handlePendingSignIn().then(() => {
        history.push("/");
      });
    }
  });
  const handleLogIn = () => {
    session.redirectToSignIn();
  };
  return (
    <div style={{ margin: 10 }} slot="end">
      {session.isUserSignedIn() ? (
        <Profile user={session.loadUserData()} />
      ) : (
        <IonButton onClick={() => handleLogIn()}>
          <IonIcon icon={logIn} />
          LogIn
        </IonButton>
      )}
    </div>
  );
};
