exports.post = (req, res) => {
  console.log(req.body);
  res.redirect('/profile/someUser');
};
