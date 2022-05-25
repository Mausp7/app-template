const router = require('express').Router();
const auth = require('../middleware/auth');
const User = require('../model/user')

router.get('/api/dashboards', auth({block: true}), async (req, res) => {
    const user = User.findById(res.locals.userId);

    res.json({user});
});

/* 
router.get('/api/dashboards/:id', async (req, res) => {
    //send :id dashboard for user
});

router.get('/api/dashboards/:id/todos', async (req, res) => {
    //send all todos from :id dashboard for user
}); 
*/

router.get('/api/dashboards/:id/todos/:todoId', async (req, res) => {
    /* 
    send :todoId todo from :id dashboard for user
     */
});

router.post('/api/dashboards', async (req, res) => {
    /* 
    create dashboard for a user, send created :id
     */
});

router.post('/api/dashboards/:id/todos', async (req, res) => {
    /* 
    create todo in :id dashboard for a user, send created :todoId
     */
});

router.patch('/api/dashboards/:id', async (req, res) => {
    //update existing dashboard.
});

router.patch('/api/dashboards/:id/todos/:todoId', async (req, res) => {
    /* 
    update existing :todoId todo in :id dashboard.
     */
});

router.delete('/api/dashboards/:id', async (req, res) => {
    /* 
    delete dashboard completely.
     */
});

router.delete('/api/dashboards/:id/todos/:todoId', async (req, res) => {
    /* 
    delete existing :todoId todo in :id dashboard.
     */
});

