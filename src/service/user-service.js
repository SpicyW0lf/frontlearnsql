const STORAGE_ITEM = 'sql-learn-user';

let userServiceInstance = null;

export default class UserService {
    static factory() {
        if (userServiceInstance == null) {
            userServiceInstance = new UserService();
        }

        return userServiceInstance;
     }

     setToken(token) {
        localStorage.setItem(STORAGE_ITEM, JSON.stringify(token));
     }

     getToken() {
            if (!localStorage.getItem(STORAGE_ITEM)) return null;

            return localStorage.getItem(STORAGE_ITEM).replace('"', '').replace('"', '');
     }

     logout() {
        localStorage.removeItem(STORAGE_ITEM);
     }

     isAuth() {
        return this.getToken() !== null && this.getToken() !== undefined;
     }
}