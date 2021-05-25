let routerServiceInstance = null;

const SIGN_IN = 'sign-in';
const SIGN_UP = 'sign-up';
const COURSES = 'courses';
const BD = 'bd';
const MATERIALS = 'materials';
const TASKS = 'tasks';

const SEPARATOR = '/'

export default class RouterService {
    static factory() {
        if (routerServiceInstance == null) {
            routerServiceInstance = new RouterService();
        }

        return routerServiceInstance;
    }

    getSignInRoute = () => {
        return SEPARATOR + SIGN_IN;
    }

    getSignUpRoute = () => {
        return SEPARATOR + SIGN_UP;
    }

    getCoursesRoute = () => {
        return SEPARATOR + COURSES;
    }

    getBdRoute = () => {
        return SEPARATOR + BD;
    }

    getMaterialsRoute = () => {
        return SEPARATOR + MATERIALS;
    }

    getTasksRoute = () => {
        return SEPARATOR + TASKS;
    }
}

export const appRouter =RouterService.factory();