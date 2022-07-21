const {Router} = require('express')

//Initializar Router
const router = Router()
//Controller
const controller = require('../controllers/admin.controller');
//Verify Admin
const Verify = require('../middlewares/verifyController');

//Routes
router.get('/verify-admin', Verify.verifyToken, Verify.verifyAdmin, controller.verifyAdmin_user)

router.get('/admin/users', Verify.verifyToken, Verify.verifyAdmin, controller.users);

router.get('/admin/messages', Verify.verifyToken, Verify.verifyAdmin, controller.messages);

router.put('/admin/bloqued/:id', Verify.verifyToken, Verify.verifyAdmin, controller.bloqued_user);
router.put('/admin/desboqued/:id', Verify.verifyToken, Verify.verifyAdmin, controller.desboqued_user);

router.post('/admin/sendmail', Verify.verifyToken, Verify.verifyAdmin, controller.sendmail);

//EXPORT ROUTER
module.exports = router