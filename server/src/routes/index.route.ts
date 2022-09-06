import router from '../config/router.config'
const auth = require('./auth.route');

router.use('/auth',auth);

module.exports = router;