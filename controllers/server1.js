/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('server1', {
    title: 'Server1'
  });
};
