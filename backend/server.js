import express from 'express'
import route_users from './routes/users.routes.js'

const app = express();

app.use(express.json())

app.use("/api/users/", route_users);

app.listen(5000, () => {
    console.log(`Server running at port 5000`);
})