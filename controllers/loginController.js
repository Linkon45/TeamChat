const getLogin = (req, res) => {
    console.log("Hello Login")
  res.render("index", {
    title: "Login - TeamChat",
  });
};

module.exports = {
  getLogin,
};
