import Dashboard from './views/Dashboard/Dashboard';

const protectedRoutes = [{
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        // layout: "/main"
    },

]
export default protectedRoutes;