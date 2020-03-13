exports.index = (req, res) => {
  let user = req.user;

  res.render('dashboard/index', {user: user});
}
