const STORAGE_ITEM = 'sql-learn-user';

let userServiceInstance = null;

export default class UserService {
    constructor() {
        this.isAuth = false;
        this.username = 'petrovadmin2';
        this.password = 'qwerty1234oooP';
    }
    static factory() {
        if (userServiceInstance === null) {
            userServiceInstance = new UserService();
        }

        return userServiceInstance;
    }

    setAuth = () => {
        this.isAuth = true;
    }

    isUserAuth = () => {
        return this.isAuth;
    }

    logout = () => {
        this.isAuth = false;
    }

}