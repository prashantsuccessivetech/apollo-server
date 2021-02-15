export default {
  getMe: async (parent, args, context) => {
    const { dataSources: { userAPI } } = context;
    const response = await userAPI.getMe();
    return response.data;
  }
};