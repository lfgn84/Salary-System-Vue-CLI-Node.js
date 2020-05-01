var express = require("express")
var app = express()
var cors = require('cors')
var usersdb = require("./usersdb.js")
var passwordsdb = require("./passwordsdb.js")

app.use(cors())
app.use(express.static('public'))

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var HTTP_PORT = 3000

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});
app.get("/api/passwords", (req, res, next) => {
    var sql = "select * from passwords"
    var params = []
    passwordsdb.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "passwords": rows
        })
    });
});
app.post("/api/passwords", (req, res, next) => {
    var errors = []
    if (!req.body.passwordsPass || !req.body.passwordsMail) {
        errors.push("No valid object");
    }
    var data = {
        passwordsMail: req.body.passwordsMail,
        passwordsPass: req.body.passwordsPass
    };
    var sql = `INSERT INTO passwords (
            passwordsMail,
            passwordsPass) VALUES (?,?)`
    var params = [data.passwordsMail, data.passwordsPass]
    passwordsdb.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "passwords": data,
            "id": this.lastID
        })

    })
})

app.get("/api/users", (req, res, next) => {
    var sql = "select * from users"
    var params = []
    usersdb.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "users": rows
        })
    });
});


app.get("/api/users/:id", (req, res, next) => {
    var sql = "select * from users where usersId = ?"
    var params = [req.params.id]
    usersdb.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "users": row
        })
    });
});


app.post("/api/users/", (req, res, next) => {
    var errors = []
    if (!req.body.usersPN) {
        errors.push("No Person number");
    }
    var data = {
        usersRange: req.body.usersRange,
        usersName: req.body.usersName,
        usersLastName: req.body.usersLastName,
        usersPN: req.body.usersPN,
        usersEmail: req.body.usersEmail,
        usersPhone: req.body.usersPhone,
        usersHiringDate: req.body.usersHiringDate,
        usersProjectName: req.body.usersProjectName,
        usersFirstCostumer: req.body.usersFirstCostumer,
        usersLastCostumer: req.body.usersLastCostumer,
        usersPriceHour: req.body.usersPriceHour,
        usersPctLevel: req.body.usersPctLevel,
        usersBruttoSalary: req.body.usersBruttoSalary,
        usersEmployeerFee: req.body.usersEmployeerFee,
        usersPaidVacation: req.body.usersPaidVacation,
        usersExtraPension: req.body.usersExtraPension,
        usersInsurance: req.body.usersInsurance,
        usersSalaryTax: req.body.usersSalaryTax,
        usersCompetenceCost: req.body.usersCompetenceCost,
        usersHealthSupport: req.body.usersHealthSupport,
        usersMobile: req.body.usersMobile,
        usersLaptop: req.body.usersLaptop,
        usersMiscHardware: req.body.usersMiscHardware,
        usersMisc: req.body.usersMisc
    }
    var sql = `INSERT INTO users (
                usersRange,
                usersName,
                usersLastName,
                usersPN,
                usersEmail,
                usersPhone,
                usersHiringDate,
                usersProjectName,
                usersFirstCostumer,
                usersLastCostumer,
                usersPriceHour,
                usersPctLevel,
                usersBruttoSalary,
                usersEmployeerFee,
                usersPaidVacation,
                usersExtraPension,
                usersInsurance,
                usersSalaryTax,
                usersCompetenceCost,
                usersHealthSupport,
                usersMobile,
                usersLaptop,
                usersMiscHardware,
                usersMisc) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
    var params = [data.usersRange,
        data.usersName,
        data.usersLastName,
        data.usersPN,
        data.usersEmail,
        data.usersPhone,
        data.usersHiringDate,
        data.usersProjectName,
        data.usersFirstCostumer,
        data.usersLastCostumer,
        data.usersPriceHour,
        data.usersPctLevel,
        data.usersBruttoSalary,
        data.usersEmployeerFee,
        data.usersPaidVacation,
        data.usersExtraPension,
        data.usersInsurance,
        data.usersSalaryTax,
        data.usersCompetenceCost,
        data.usersHealthSupport,
        data.usersMobile,
        data.usersLaptop,
        data.usersMiscHardware,
        data.usersMisc]
    usersdb.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "users": data,
            "id": this.lastID
        })
    });
})

app.put("/api/users/:id", (req, res, next) => {
    var data = {
        usersRange: req.body.usersRange,
        usersName: req.body.usersName,
        usersLastName: req.body.usersLastName,
        usersPN: req.body.usersPN,
        usersEmail: req.body.usersEmail,
        usersPhone: req.body.usersPhone,
        usersHiringDate: req.body.usersHiringDate,
        usersProjectName: req.body.usersProjectName,
        usersFirstCostumer: req.body.usersFirstCostumer,
        usersLastCostumer: req.body.usersLastCostumer,
        usersPriceHour: req.body.usersPriceHour,
        usersPctLevel: req.body.usersPctLevel,
        usersBruttoSalary: req.body.usersBruttoSalary,
        usersEmployeerFee: req.body.usersEmployeerFee,
        usersPaidVacation: req.body.usersPaidVacation,
        usersExtraPension: req.body.usersExtraPension,
        usersInsurance: req.body.usersInsurance,
        usersSalaryTax: req.body.usersSalaryTax,
        usersCompetenceCost: req.body.usersCompetenceCost,
        usersHealthSupport: req.body.usersHealthSupport,
        usersMobile: req.body.usersMobile,
        usersLaptop: req.body.usersLaptop,
        usersMiscHardware: req.body.usersMiscHardware,
        usersMisc: req.body.usersMisc
    }
    var sql = `UPDATE users SET 
                usersRange = ?,
                usersName = ?,
                usersLastName = ?,
                usersPN = ?,
                usersEmail = ?,
                usersPhone = ?,
                usersHiringDate = ?,
                usersProjectName = ?,
                usersFirstCostumer = ?,
                usersLastCostumer = ?,
                usersPriceHour = ?,
                usersPctLevel = ?,
                usersBruttoSalary = ?,
                usersEmployeerFee = ?,
                usersPaidVacation = ?,
                usersExtraPension = ?,
                usersInsurance = ?,
                usersSalaryTax = ?,
                usersCompetenceCost = ?,
                usersHealthSupport = ?,
                usersMobile = ?,
                usersLaptop = ?,
                usersMiscHardware = ?,
                usersMisc = ?
       WHERE usersId = ?`
    var params = [data.usersRange,
        data.usersName,
        data.usersLastName,
        data.usersPN,
        data.usersEmail,
        data.usersPhone,
        data.usersHiringDate,
        data.usersProjectName,
        data.usersFirstCostumer,
        data.usersLastCostumer,
        data.usersPriceHour,
        data.usersPctLevel,
        data.usersBruttoSalary,
        data.usersEmployeerFee,
        data.usersPaidVacation,
        data.usersExtraPension,
        data.usersInsurance,
        data.usersSalaryTax,
        data.usersCompetenceCost,
        data.usersHealthSupport,
        data.usersMobile,
        data.usersLaptop,
        data.usersMiscHardware,
        data.usersMisc,
        req.params.id]
    usersdb.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "users": data,
            "id": this.lastID
        })
    });
})

app.delete("/api/users/:id", (req, res, next) => {
    usersdb.run(
        'DELETE FROM users WHERE usersId = ?',
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message": "deleted", rows: this.changes})
        });
})

// Root path
app.get("/", (req, res, next) => {
    res.json({"message": "Ok"})
});

