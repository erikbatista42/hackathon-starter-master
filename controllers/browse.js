/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('browse', {
    title: 'Browse'
  });
};
