import router from '../config/router.config'
const ConversationController = require("../controllers/conversation.controller");

router.post("/create",ConversationController.create);

router.get("/:userId",ConversationController.findByUserId);

router.post("/findOrCreate",ConversationController.findOrCreate);



module.exports = router;
