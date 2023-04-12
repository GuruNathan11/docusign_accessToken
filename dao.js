// In this example, we're just using a simple in-memory object as our "database"
// You could replace this with an actual database implementation if you wanted to
const database = {};

const saveAccessToken = async (accessToken) => {
  database.accessToken = accessToken;
};

module.exports = {
  saveAccessToken,
};
