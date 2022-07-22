const getLogin = (req, res) => {
  res.render("index", {
    title: "Login - TeamChat",
  });
};

module.exports = {
  getLogin,
};
