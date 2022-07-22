const getInbox = (req, res) => {
  res.render("inbox", {
    title: "Inbox - TeamChat",
  });
};

module.exports = {
  getInbox,
};
