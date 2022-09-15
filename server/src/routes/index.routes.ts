import router from '../config/router.config'
import { Iroute } from '../interfaces/route.interface';
const auth = require('./auth.routes');
const conversation = require('./conversation.routes');
const message = require('./message.routes');
const user = require('./user.routes');

const userRoutes :Array<Iroute> = [
    { path: "/auth", route: auth },
    { path: "/conversation", route: conversation },
    { path: "/message", route: message },
    { path: "/user", route: user },
];

userRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;