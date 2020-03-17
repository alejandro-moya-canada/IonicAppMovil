import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable({
    providedIn: 'root'
})
export class UserData {
    favorites: string[] = [];
    HAS_LOGGED_IN = 'hasLoggedIn';
    HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

    constructor(public storage: Storage) { }

    // funcion cierre de sesion del usuario
    logout(): Promise<any> {
        return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
          return this.storage.remove('username');
        }).then(() => {
          window.dispatchEvent(new CustomEvent('user:logout'));
        });
    }

    // funcion que devuelve si se ha logeado un usuario
    isLoggedIn(): Promise<boolean> {
        return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
            return value === true;
        });
    }

}
