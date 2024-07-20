// Please don't change the pre-written code
// Import the necessary modules here
import { body, validationResult } from "express-validator";

export const formValidation = async (req, res, next) => {
  // Write your code here
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Enter a valid email"),
    
    body("resume").custom((value, { req }) => {
      let uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      if (!req.file) {
        throw new Error("Resume is required");
      }
      return true;
    })
  ]

  await Promise.all(rules.map(rule => rule.run(req)));

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};
