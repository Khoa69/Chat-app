import router from '../config/router.config'
import UserController from '../controllers/user.controller';

router.get("/view/:userId",UserController.findById);

module.exports = router;
