import React from 'react';
import { IonMenu, IonContent, IonPage, IonHeader, IonMenuButton, IonToolbar } from '@ionic/react';
import "positions/Positions.css";
import './Home.css';
import Realms from './realms/Index';

const Home: React.FC = () => {
  return (<>
    <IonMenu contentId="main-content" type='push' side='end'>
      <IonContent>
      </IonContent>
    </IonMenu>
    <IonPage id="main-content">
      <IonContent class="fullscreen-content" fullscreen={true}>
        <IonMenuButton className='main-menu-button' ></IonMenuButton>
        <Realms />
      </IonContent>
    </IonPage>
  </>)
}

export default Home;