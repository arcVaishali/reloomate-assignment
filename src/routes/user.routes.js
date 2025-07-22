const Router = require("express") ;
const userRouter = Router() ;
const verifyJWT  = require("../middlewares/auth.middleware");
const {upload } = require("../middlewares/multer.middleware")

const { login , signup , userData , onboardingDetails } = require("../controllers/user.controller");

userRouter.route("/signup").post( signup ) ;
userRouter.route("/login").post( login );

userRouter.route("/userData").get( verifyJWT , userData ) ;
userRouter.route("/onboardingDetails").get( verifyJWT , onboardingDetails ) ;


module.exports = { userRouter } ;