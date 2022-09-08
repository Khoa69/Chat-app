import router from '../config/router.config'
const MessageController = require("../controllers/message.controller");

router.post("/sendMessage",MessageController.sendMessage)
router.get("/allMessage/:conversationId",MessageController.getMessage)

module.exports = router;
