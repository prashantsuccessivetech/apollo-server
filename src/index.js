import config from './config/configurations';
import Server from './server';
import Schema from './modules';


const server = new Server(config);

const { typeDefs, resolvers } = Schema;

const initServer = async () => {
  server.setupApollo({ resolvers, typeDefs });
};

initServer();


export default server;