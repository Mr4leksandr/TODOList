const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');


const items = [];
const itemsStudy = [];

app.get('/', (req, res)=>{
    let today = new Date();
    let options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };

    let day = today.toLocaleDateString("en-US", options)

    console.log(day);

    res.render('index', {
        listTitle: day,
        newListItems: items
    });
});

app.post("/", (req, res) =>{
    console.log(req.body.list);
    let item = req.body.newItem;

    if(req.body.list === "Study To Do"){
        itemsStudy.push(item);
        res.redirect('/study');
    } else {
        items.push(item);
        res.redirect('/');
    }
});

app.get("/study", (req, res)=>{
    res.render("index", {
        listTitle: "Study To Do",
        newListItems: itemsStudy
    });
});


app.listen(3000, () =>{
    console.log("Server is running on port 3000.");
});