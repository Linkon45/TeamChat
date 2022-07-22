const getUsers = (req, res) => {
  console.log("Hello Users");
  res.render("users", {
    title: "Users - TeamChat",
  });
};

module.exports = {
  getUsers,
};
