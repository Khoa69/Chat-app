import defaultConfig from "./default.config";

const mongoose = require("mongoose");

const connect = () =>
	mongoose
		.connect(
			defaultConfig.mongo_url
		)
		.then(() => console.log(`connect success`))
		.catch((err:any) => console.log(`cant connect`, err));

export default connect ;