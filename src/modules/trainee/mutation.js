import userInstance from '../../service/user';
import pubsub from '../pubsub';
import { constant } from '../../lib/constant';

export default {
  createTrainee: async (parent, args, context) => {
    try {
      const { user: { name, email, password, role, createdBy } } = args;
      const { dataSources: { traineeAPI } } = context;
      const response = await traineeAPI.createTrainee({name, email, createdBy, password, role });
      pubsub.publish(constant.subscriptions.TRAINEE_ADDED, { traineeAdded: response });
      return response;
    } catch(error) {
      return {
        message: 'Database under maintainance',
        status: 503
      }
    }
  },

  updateTrainee: async (parent, args, context) => {
    try {
      const { user } = args;
      const { dataSources: { traineeAPI } } = context;
      const response = await traineeAPI.updateTrainee(user);
      pubsub.publish(constant.subscriptions.TRAINEE_UPDATED, { traineeUpdated: response });
      return response;
    } catch (error) {
      return {
        message: 'Database under maintaince',
        status: 503
      }
    }
    
  },

  deleteTrainee: async (parent, args, context) => {
    try {
      const { id } = args;
      const { dataSources: { traineeAPI } } = context;
      const response = await traineeAPI.deleteTrainee(id);
      pubsub.publish(constant.subscriptions.TRAINEE_DELETED, { traineeDeleted: response });
      return response;
    } catch (error) {
      return { 
        message: 'Database under maintaince',
        status: 503
      }
    }
  },
};