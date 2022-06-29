const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const port = 7000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const sequelize = new Sequelize("learningDB", "root", 'Miss&U&Forever91', {
    dialect: "mysql"
});

const codeTable = sequelize.define(
    'codeTable',
    { id: {
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
    },
        title: Sequelize.STRING,
        description: Sequelize.TEXT

    }, { tableName: "codeTable" });

// codeTable.sync({ force: true });
codeTable.sync();

sequelize.authenticate().then(() => {
    console.log('succesfully')
}).catch((error) => {
    console.log(error, 'this has a error')
})

// app.get('/', (request, respons) => {
//     respons.send('working fine');
// });

app.post('/', async (request, respons) => {
    const title = request.body.title;
    const description = request.body.description;
    const saveCodeTable = codeTable.build({
        title,
        description
    })
    await saveCodeTable.save();
    respons.send('data posted sucessfully')
});

app.get('/', async(request, respons)=> {
    const allData = await codeTable.findAll();
    respons.json(allData);
})

app.listen(port, () => {
    console.log(`server starts at http://localhost:${port}`);
});
