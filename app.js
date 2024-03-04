const express = require("express");

const app = express();

app.use(express.json()).use(express.static("public"))

// ДБ
const users = [
    {
        id: 1,
        name: "Khaetbek",
        age: 21
    },
    {
        id: 2,
        name: "Abdumannof",
        age: 18
    },
];
let id = 1;

const findUserById = id => {
    for (let index = 0; index < users.length; index++) {
        const user = users[index];

        if(user.id = id) return index;
            
        return -1
    }
}

app.get("/api/users", (_, res) =>{
    res.send(users);
})

app.get("/api/users/:id", (req, res) => {

    const id = req.params.id;

    const index = findUserById(id);

    index > -1 ? res.send(users[index])
               : res.status(404).send(`Юзер не найдено`)
});

app.post("/api/users", (req, res) => {

    if(!req.body) return res.sendStatus(400)

    const user = {
        name: req.body.name,
        age: req.body.age
    }

    user.id = id++;
    users.push(user)
    res.send(user);

})

app.delete("api/users/:id", (req, res) => {
    const index = findUserById(req.params.id);

    index > -1 ? res.send(users.splice(index, 1)[0])
                : res.status(404).send("Юзур не найдено");
})


app.put("/api/users:id", (req, res) => {
    const index = findUserById(req.params.id),
        userName = req.body.name,
        UserAge = req.body.age;

    if (index > -1) {
        const user= users[index];
        user.age = userAge;
        user.name = userName;
        res.send(user);
    }
    else {
        res.status(404).send("Юзер не найдено");
    }
})

app.listen(9000, () =>{
    console.log(`
        Сервер работает нажмите http://localhost:9000/api/users
        `);
})