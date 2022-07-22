const getUsers = (req, res) => {
  res.render("users", {
    title: "Users - TeamChat",
  });
};

module.exports = {
  getUsers,
};
