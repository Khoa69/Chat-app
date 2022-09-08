import router from '../config/router.config'
import { Iroute } from '../interfaces/route.interface';
const auth = require('./auth.route');
const conversation = require('./conversation.route');

const userRoutes :Array<Iroute> = [
    { path: "/auth", route: auth },
    { path: "/conversation", route: conversation }
];

userRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;