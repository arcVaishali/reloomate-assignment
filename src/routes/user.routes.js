const Router = require("express") ;
const userRouter = Router() ;
const verifyJWT  = require("../middlewares/auth.middleware");

const { register , login , profile , onboarding } = require("../controllers/user.controller");

userRouter.route("/register").post( register ) ;
userRouter.route("/login").post( login );

userRouter.route("/profile").get( verifyJWT , profile ) ;
userRouter.route("/onboarding").get( verifyJWT , onboarding ) ;


module.exports = { userRouter } ;