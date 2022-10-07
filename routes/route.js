const router = require('express').Router();
const controller = require('../controllers/controller');


// group controls 
router.get('/show/groups',controller.showGroups);
router.get('/show/group/:group_name', controller.showGroup);
router.post('/create/group/:group_name',controller.createGroup);


//expenses controls
router.get('/show/expense/group/:group_name',controller.showExpenses);
router.post('/create/expense/group/:group_name',controller.createExpense);
router.post('/update/expense/group/:group_name',controller.updateExpense);
router.post('/delete/expense/group/:group_name',controller.deleteExpense);

module.exports = router;