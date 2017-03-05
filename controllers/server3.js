/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('server3', {
    title: 'Server3'
  });
};
