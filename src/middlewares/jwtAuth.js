import jwt from "jsonwebtoken";
const jwtSecret = "MYJWTSECRETTOKEN";
export const jwtAuth = (req, res, next) => {
   try {
      const { jwtToken } = req.cookies;
      if (!jwtToken) {
         console.log("No JWT token found in cookies");
         return res.status(401).redirect("/login"); // Return JSON for APIs
      }
      const decoded = jwt.verify(jwtToken, jwtSecret);
      // jwt.verify(jwtToken, jwtSecret, (err, decoded) => {
      req.RecruiterId = decoded.RecruiterId;

      if (!req.session || req.session.RecruiterId !== req.RecruiterId) {
         return res.status(401).render("login"); // Return JSON for APIs
      }
      next();
   } catch (error) {
      console.log("Please login to continue", error);
      return res.redirect("/login");
   }
};

export const setLastVisit = (req, res, next) => {
   // if cookie is set, then add a local varisable with last visit data.

   if (req.cookies.lastVisit) {
      res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
   }
   res.cookie("lastVisit", new Date().toISOString(), {
      maxAge: 2 * 24 * 60 * 1000,
   });
   next();
};
