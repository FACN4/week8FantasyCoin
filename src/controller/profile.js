exports.get = (req, res) => {
  const { user } = req.params;
  res.render('profile', { title: user });
};
