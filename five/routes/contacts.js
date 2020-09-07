const express = require('express');
const router = express.Router();

// @route   GET api/contacts
// @desc    Get all contacts associated with a specific user
// @acceess Private 
router.get('/', (req, res) => {
    res.send('Gets all contacts associated with a specific user');
});

// @route   POST api/contacts
// @desc    Add new contact
// @acceess Private 
router.post('/', (req, res) => {
    res.send('Add a new contact');
});

// @route   PUT api/contacts/:id
// @desc    Update contact
// @acceess Private 
router.put('/:id', (req, res) => {
    res.send('Update contact');
});

// @route   DELETE api/contacts/:id
// @desc    Delete contact
// @acceess Private 
router.delete('/:id', (req, res) => {
    res.send('Delete contact');
});


module.exports = router;