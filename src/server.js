import { createServer } from 'http';
import Express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { TraineeApi, UserApi} from './datasource';

export default class Server {
  constructor(config) {
    this.config = config;
    this.app = new Express();
    this.run = this.run.bind(this);
  }

  get application() {
    return this.app;
  }

  run() {
    const { PORT } = this.config;
    this.httpServer.listen(PORT, () => {
      console.info(`server started on port ${PORT}`); // eslint-disable-line no-console
    });

    return this;
  }

  async setupApollo(schema) {
    const { app } = this;

    // this.server = new ApolloServer({
    //   ...schema,
    //   context: ({ req }) => ({
    //     request: req,
    //     token: req.headers.authorization || '',
    //   }),
    //   onHealthCheck: () => new Promise((resolve) => {
    //     resolve('I am OK');
    //   }),
    // });
    this.server = new ApolloServer({
      ...schema,
      dataSources: () => ({
          userAPI : new UserApi(),
          traineeAPI: new TraineeApi(),
      }),
      context: ({ req }) => {
        if (req) {
          return { token: req.headers.authorization };
        }
        return {};
      },
      onHealthCheck: () => new Promise((resolve) => {
        resolve('I am OK');
      }),
    });

    this.server.applyMiddleware({ app });
    this.httpServer = createServer(app);
    this.server.installSubscriptionHandlers(this.httpServer);
    this.run();
  }
}