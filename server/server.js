const PORT = process.env.PORT || 8000;
const express = require('express');
const app = express();
const cors = require('cors');
const todoRoutes = require('./routes/todo');
const userRoutes = require('./routes/user');

app.use(cors());
app.use(express.json());

// user routes
app.use('/api', userRoutes);
// todo routes
app.use('/api/todos', todoRoutes);

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
