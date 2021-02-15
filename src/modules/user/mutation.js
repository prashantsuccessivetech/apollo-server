export default {
    loginUser: async (parent, args, context) => {
      try {
        const { payload: { email, password } } = args;
        console.log(email, password)
        const { dataSources: { userAPI } } = context;
        const response = await userAPI.loginUser({ email, password });
        return response;
      } catch (error) {
        return {
          message: 'Server under maintaince',
          status: 503
        }
      }
    }
  };