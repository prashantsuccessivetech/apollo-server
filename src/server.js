import Express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import { UserAPI } from './datasource/index';

class Server {
  constructor(config) {
    this.config = config;
    this.app = Express();
  }

  bootstrap() {
    this.setupRouts();
    return this;
  }

  setupRouts() {
    const { app } = this;
    app.get('/health-check', (req, res) => {
      res.send('I am ok');
    });
    return this;
  }

  setupApollo(schema) {
    const { app } = this;
    this.Server = new ApolloServer({
      ...schema,
      dataSources: () => {
        const userAPI = new UserAPI();
        return { userAPI };
      }
    });
    this.Server.applyMiddleware({ app });
    this.httpServer = createServer(app);
    this.Server.installSubscriptionHandlers(this.httpServer);
    this.run();
  }

  run() {
    const { config: { port } } = this;
    const { app } = this;
    app.listen(port, () => {
      console.log(`App is running on port ${port}`);
    });
  }
}
export default Server;