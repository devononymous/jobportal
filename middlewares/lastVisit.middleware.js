export const setLastVisit = (req, res, next) => {
  // 1. If cookie is not , htere add a local variable with last ith time data.
  if (req.cookies.lastVisit) {
    res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
  }
  res.cookie("lastVisit", new Date().toISOString(), {
    maxAge: 45 * 24 * 60 * 60 * 1000,
  });
  next();
};
