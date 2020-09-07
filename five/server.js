const expres = require('express');
const connectDB = require('./config/db')

const app = expres();

// connect to database
connectDB();

// init middleware
app.use(expres.json({ extended: false }));

app.get('/', (req, res) => {
    res.send('world hello???')
})


// let's define our routes:
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
})