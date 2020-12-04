const {Router} = require('express');
const TestModel = require('../models/test');
const router = Router();

router.post('/', async (req, res) => {
    try {
        const title = req.body.title;
        console.log(title);

        const test = new TestModel({
            title,
        });

        await test.save();

        res.end();
    } catch (e) {
        res.status(500).send(e.message).end();
    }
});

router.get('/', async (req, res) => {
    try {
        const test = await TestModel.find({});
        res.send(test).end();
    } catch (e) {
        res.status(500).send(e.message).end();
    }
});

router.put('/', async (req, res) => {
    try {
        const id = req.body.id;
        const title = req.body.title;

        if (!id) {
            throw new Error('id is invalid');
        }

        const item = await TestModel.findById(id);

        item.title = title;

        await item.save();

        res.end();
    } catch (e) {
        res.status(500).send(e.message).end();
    }
});

router.delete('/', (req, res) => {
    try {
        const id = req.body.id;

        if (!id) {
            throw new Error('id is invalid');
        }

        TestModel.findByIdAndDelete(id).exec();

        res.end();
    } catch (e) {
        res.status(500).send(e.message).end();
    }
});

module.exports = router;
