import {getLogger} from "../core";
import {RouteComponentProps} from "react-router";
import {Redirect} from 'react-router-dom';
import React, {useContext, useState} from "react";
import {AuthContext} from "./AuthProvider";
import {IonButton, IonContent, IonHeader, IonInput, IonLoading, IonPage, IonTitle, IonToolbar} from '@ionic/react';


const log = getLogger('Login');

interface LoginState {
    username?: string;
    password?: string;
}

export const Login: React.FC<RouteComponentProps> = ({history}) => {
    const {isAuthenticated, isAuthenticating, login, authenticationError} = useContext(AuthContext);
    const [state, setState] = useState<LoginState>({});
    const {username, password} = state;
    const handleLogin = () => {
        log('handleLogin...');
        login?.(username, password);
    };
    log('render');
    if (isAuthenticated) {
        return <Redirect to={{pathname: '/'}}/>
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonInput placeholder="username" value={username} onIonChange={e => setState({
                    ...state,
                    username: e.detail.value || ''
                })}/>
                <IonInput placeholder="password" value={password} onIonChange={e => setState({
                    ...state,
                    password: e.detail.value || ''
                })}/>
                <IonLoading isOpen={isAuthenticating}/>
                {authenticationError && (<div>{authenticationError.message || 'Failed to authenticate'}</div>)}
                <IonButton onClick={handleLogin}>Login</IonButton>

            </IonContent>
        </IonPage>
    );
};