import router from '../config/router.config'
const MessageController = require("../controllers/message.controller");

router.post("/",MessageController )

module.exports = router;
