const getInbox = (req, res) => {
  console.log("Hello Inbox");
  res.render("inbox", {
    title: "Inbox - TeamChat",
  });
};

module.exports = {
  getInbox,
};
