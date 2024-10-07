const { body, validationResult } = require("express-validator");
exports.roleAuth = (req, res, next) => {
  const role = req.headers["role"];
  console.log("Middle");
  if (role === "admin") next();
  else if (role === null)
    res.status(403).send("You Need to sign in Perform this Task");
  else res.status(401).send("You are not Authorized to Perform this Task");
};

exports.forgetValidationRules = [
  body("email").isEmail().withMessage("Please Enter a valid Email Address"),
]

exports.forgetValidation = (req,res,next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }
  next()
}

exports.userValidationRules = [
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 5 characters long"),
];
exports.LoginValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

exports.SignupValidationRules = () => {
  return [
    body("username").not().isEmpty().withMessage("Enter Username"),
    body("email").notEmpty().withMessage("Empty Email").isEmail().withMessage("Please Enter Valid Email"),
    body("password").isLength({ min: 6 }),
    body("role").not().isEmpty().withMessage("Select user's Role"),
  ];
};

exports.SignUpValidate = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
