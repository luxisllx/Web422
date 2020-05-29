const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dataService = require("./modules/data-service.js");

const myData = dataService("mongodb+srv://luxisllx:escape520@cluster0-mzjor.mongodb.net/sample_supplies?retryWrites=true&w=majority");

const app = express();

app.use(cors());

app.use(bodyParser.json());

const HTTP_PORT = process.env.PORT || 8080;

app.get("/", (req, res)=>{
    res.send("Hello");
});

// ************* API Routes

// POST /api/sales (NOTE: This route must read the contents of the request body)

app.post("/api/sales", (req,res)=>{
    myData.addNewSale(req.body)
    .then(sale=>res.json(sale))
    .catch(err=>res.json({message: err}));
});


// GET /api/sales (NOTE: This route must accept the numeric query parameters "page" and "perPage", ie: /api/sales?page=1&perPage=5 )
app.get("/api/sales", (req,res)=>{
    myData.getAllSales(req.query.page,req.query.perPage)
    .then(sale=>res.json(sale))
    .catch(err=>res.json({message: err}));
});


// GET /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8)
app.get("/api/sales/:id", (req,res)=>{
    myData.getSaleById(req.params.id)
    .then(sale=>res.json(sale))
    .catch(err=>res.json({message: err}));
});



// PUT /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8 as well as read the contents of the request body)
app.put("/api/sales/:id", (req,res)=>{
    myData.updateSaleById(req.body,req.params.id)
    .then(message=>res.json(message))
    .catch(err=>res.json({err}));
});

// DELETE /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8)
app.delete("/api/sales/:id", (req,res)=>{
    myData.deleteSaleById(req.params.id)
    .then(message=>res.json(message))
    .catch(err=>res.json({err}));
});

// ************* Initialize the Service & Start the Server

myData.initialize().then(()=>{
    app.listen(HTTP_PORT,()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});

