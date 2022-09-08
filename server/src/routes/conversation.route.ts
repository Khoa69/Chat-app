import router from '../config/router.config'
const ConversationController = require("../controllers/conversation.controller");

router.post("/create",ConversationController.create)

module.exports = router;
