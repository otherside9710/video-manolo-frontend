import Vue from 'vue';
import Router from "vue-router";
import Login from '../../login/ui/Login';
import Signup from '../../signup/ui/Signup';
import Home from "../../users/homepage/ui/Home";
import HomeAdmin from "../../admin/homepage/ui/HomePage";
import MovieAdmin from "../../admin/movie/ui/MovieAdmin";
import MovieUpdate from "../../admin/movie/ui/MovieUpdate";
import UserReservation from "../../users/reservation/ui/UserReservation";

Vue.use(Router);

const isLogged = function (to, from, next) {
    if (localStorage.getItem('login') === 'valid') {
        next();
    } else {
        localStorage.setItem('login_valid', 'invalid');
        location.href = '/'
    }
};
const router = new Router({

    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/signup',
            name: 'signup',
            component: Signup
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            beforeEnter: function (to, from, next) {
                isLogged(to, from, next);
            }
        },
        {
            path: '/reservation',
            name: 'home-reservation',
            component: UserReservation,
            beforeEnter: function (to, from, next) {
                isLogged(to, from, next);
            }
        },
        {
            path: '/admin',
            name: 'admin',
            component: HomeAdmin,
            beforeEnter: function (to, from, next) {
                isLogged(to, from, next);
            }
        },
        {
            path: '/admin/movie',
            name: 'admin-movie',
            component: MovieAdmin,
            beforeEnter: function (to, from, next) {
                isLogged(to, from, next);
            }
        },
        {
            path: '/admin/movie/update/:id',
            name: 'admin-movie-update',
            component: MovieUpdate,
            props: true,
            beforeEnter: function (to, from, next) {
                isLogged(to, from, next);
            }
        },
        {
            path: '*',
            name: '404',
            component: Home
        }
    ],
    mode: 'history'
});

export default router;