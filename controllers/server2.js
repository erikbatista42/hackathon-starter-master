/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('server2', {
    title: 'Server2'
  });
};
