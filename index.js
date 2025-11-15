import Server from "./src/servers/config.js";
import router from "./src/routers/index.routes.js";

const server = new Server();

server.listen();

server.app.use('/api', router);

export default server;