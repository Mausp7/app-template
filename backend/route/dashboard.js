const router = require('express').Router();
const auth = require('../middleware/auth');
const User = require('../model/user')

router.get('/', auth({block: true}), async (req, res) => {
    const user = await User.findById(res.locals.userId);
    res.json({user});
});

router.get('/:id', auth({block: true}), async (req, res) => {
    const user = await User.findById(res.locals.userId);
    const dashboards = user.dashboards.id(req.params.id);

    res.json({dashboards});
});

router.get('/:id/todos',  auth({block: true}), async (req, res) => {
    const user = await User.findById(res.locals.userId);
    const todos = user.dashboards.id(req.params.id).todos;

    res.json({todos});
}); 

router.get('/:id/todos/:todoId', auth({block: true}), async (req, res) => {
    const user = await User.findById(res.locals.userId);
    const todo = user.dashboards.id(req.params.id).todos.id(req.params.todoId);

    res.json({todo});
});

router.post('/', auth({block: true}), async (req, res) => {
    const user = await User.findById(res.locals.userId);

    user.dashboards.push({
        title: req.body.title
    });

    user.save((err) => {
        if (err) return res.status(500).send(err);

        res.json({dashboards: user.dashboards});
    })
});

router.post('/:id/todos', auth({block: true}), async (req, res) => {
    const user = await User.findById(res.locals.userId);
    if (!user.dashboards.id(req.params.id)) return res.sendStatus(404)

    user.dashboards.id(req.params.id).todos.push({
        title: req.body.title,
        content: req.body.content
    });

    user.save((err) => {
        if (err) return res.status(500).send(err);

        res.json({dashboards: user.dashboards});
    })


});

router.patch('/api/dashboards/:id', async (req, res) => {
    //update existing dashboard.
});

router.patch('/api/dashboards/:id/todos/:todoId', async (req, res) => {
    /* 
    update existing :todoId todo in :id dashboard.
     */
});

router.delete('/:id', auth({block: true}), async (req, res) => {
    const user = await User.findById(res.locals.userId);

    user.dashboards.pull(req.params.id);

    user.save((err) => {
        if (err) return res.status(500).send(err);

        res.json({dashboards: user.dashboards});
    })
});

router.delete('/:id/todos/:todoId', auth({block: true}), async (req, res) => {
    const user = await User.findById(res.locals.userId);
    console.log(user.dashboards.id(req.params.id))
    if (!user.dashboards.id(req.params.id)) return res.sendStatus(404)

    user.dashboards.id(req.params.id).todos.pull(req.params.todoId);

    user.save((err) => {
        if (err) return res.status(500).send(err);

        res.json({todos: user.dashboards.id(req.params.id).todos});
    })
});

module.exports = router;