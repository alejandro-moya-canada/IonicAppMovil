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

    // funcion que devuelve los favoritos
    hasFavorite(sessionName: string): boolean {
        return (this.favorites.indexOf(sessionName) > -1);
    }
    
    // función que añade al array de favoritos
    addFavorite(sessionName: string): void {
        this.favorites.push(sessionName);
    }
    
    // funcion que borra del array de favoritos
    removeFavorite(sessionName: string): void {
        const index = this.favorites.indexOf(sessionName);
        if (index > -1) {
            this.favorites.splice(index, 1);
        }
    }

    // funcion de inicio de sesion
    login(username: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
        this.setUsername(username);
        return window.dispatchEvent(new CustomEvent('user:login'));
    });
    }
    
    // funcion de registro
    signup(username: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
        this.setUsername(username);
        return window.dispatchEvent(new CustomEvent('user:signup'));
    });
    }
    

    // funcion cierre de sesion del usuario
    logout(): Promise<any> {
        return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
          return this.storage.remove('username');
        }).then(() => {
          window.dispatchEvent(new CustomEvent('user:logout'));
        });
    }

    // funcion que añade el nombre del usuario
    setUsername(username: string): Promise<any> {
        return this.storage.set('username', username);
    }
    
    // funcion que devuelve el nombre del usuario
    getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
        return value;
    });
    }
    

    // funcion que devuelve si se ha logeado un usuario
    isLoggedIn(): Promise<boolean> {
        return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
            return value === true;
        });
    }

}
