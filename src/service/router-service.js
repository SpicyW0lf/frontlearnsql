let routerServiceInstance = null;

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

export const appRouter = RouterService.factory();