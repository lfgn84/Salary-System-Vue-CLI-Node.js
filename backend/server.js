var express = require("express")
var app = express()
var cors = require('cors')
var usersdb = require("./usersdb.js")
var passwordsdb = require("./passwordsdb.js")
var salarydb = require("./salarydb.js")

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
    var params = [req.query.mail]
    var sql = "select passwordsPass from passwords where passwordsMail = ? "
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

app.get("/api/users/user", (req, res, next) => {
    var params = [req.query.mail]
    var sql = "select * from users where usersEmail = ?"
    usersdb.all(sql, params, (err, rows) => {
        console.log("getting user")
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
});
app.get("/api/salary", (req, res, next) => {
    var sql = "select * from salary"
    var params = []
    salarydb.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "salary": rows
        })
    });
});
app.get("/api/salary/period",(req, res, next) => {
    console.log('gettin period from: ' + req.query.startDay +" to: "+req.query.endDay + " ID:  "+ req.query.id );
    var params = [req.query.startDay, req.query.endDay, req.query.id]
    var sql = "select * from salary where (salaryDate between ? and ? ) and salaryUserId = ? order by salaryDate"
    salarydb.all(sql,params, (err, rows) =>{
        if (err){
            res.status(400).jason({"err": err.message});
            return;
        }
        res.json({
            "message":"success",
            "salary": rows
        })
    });
});
app.get("/api/salary/day",(req, res, next) => {
    console.log('gettin day' + req.query.day +" ID:  "+ req.query.id );
    var params = [req.query.day, req.query.id];
    var sql = "select * from salary where salaryDate = ? and salaryUserId = ?"
    salarydb.all(sql,params, (err, rows) =>{
        if (err){
            res.status(400).jason({"err": err.message});
            return;
        }
        res.json({
            "message":"success",
            "salary": rows
        })
    });
});
app.get("/api/salary/pot",(req,res,next)=>{
    var params = [req.query.id];
    var sql = "select sum(salaryIncome) as pot from salary where salaryUserId = ? "
    salarydb.all(sql,params,(err,rows)=>{
        if(err){
            res.status(400).jason({"err": err.message});
            return;
        }
        res.json({
            "message":"success",
            "salary": rows
        })
    });
});
app.post("/api/salary", (req, res, next) => {
    var errors = []
    if (!req.body.salaryUserId || !req.body.salaryDate) {
        errors.push("No valid object");
    }
    var data = {
        salaryUserId: req.body.salaryUserId,
        salaryDate: req.body.salaryDate,
        salaryProject: req.body.salaryProject,
        salaryHourFare: req.body.salaryHourFare,
        salaryWorkedHours: req.body.salaryWorkedHours,
        salaryIncome: req.body.salaryIncome,
        salaryUserLocked: req.body.salaryUserLocked,
        salaryAdminLocked: req.body.salaryAdminLocked
    };
    var sql = `INSERT INTO salary (
                salaryUserId,
                salaryDate,
                salaryProject,
                salaryHourFare,
                salaryWorkedHours,
                salaryIncome,
                salaryUserLocked,
                salaryAdminLocked
                ) VALUES (?,?,?,?,?,?,?,?)`
    var params = [data.salaryUserId,
                  data.salaryDate,
                  data.salaryProject,
                  data.salaryHourFare,
                  data.salaryWorkedHours,
                  data.salaryIncome,
                  data.salaryUserLocked,
                  data.salaryAdminLocked
    ]
    salarydb.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "salary": data,
            "id": this.lastID
        })

    })
});
app.put("/api/salary/:id", (req, res, next) => {
    var errors = []
    if (!req.body.salaryUserId || !req.body.salaryDate || !req.body.salaryProject || !req.body.salaryHourFare || !req.body.salaryWorkedHours || !req.body.salaryIncome) {
        errors.push("No valid object");
    }
    var data = {
        salaryUserId: req.body.salaryUserId,
        salaryDate: req.body.salaryDate,
        salaryProject: req.body.salaryProject,
        salaryHourFare: req.body.salaryHourFare,
        salaryWorkedHours: req.body.salaryWorkedHours,
        salaryIncome: req.body.salaryIncome
    };
    var params = [
        data.salaryUserId,
        data.salaryDate,
        data.salaryProject,
        data.salaryHourFare,
        data.salaryWorkedHours,
        data.salaryIncome,
        req.params.id];
    var sql = `UPDATE salary SET
                salaryUserId = ?,
                salaryDate = ?,
                salaryProject = ?,
                salaryHourFare = ?,
                salaryWorkedHours = ?,
                salaryIncome = ?
                where salaryId = ?`
    salarydb.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "salary": data,
            "id": this.lastID
        })

    })
});
app.patch("/api/salary/lock", (req, res, next) => {
    var errors = []
    var data = {
        salaryUserLocked : req.body.salaryUserLocked,
        startDate: req.body.startDate,
        endDate : req.body.endDate,
        salaryUserId : req.body.salaryUserId
    };
    var params = [
        data.salaryUserLocked,
        data.startDate,
        data.endDate,
        data.salaryUserId];
    var sql = `UPDATE salary SET
                salaryUserLocked = ?
                where (salaryDate between ? and ? ) and salaryUserId = ?`
    console.log( data.startDate + ' ' + data.endDate+ ' ' + data.salaryUserLocked + ' ' + data.salaryUserId);
    salarydb.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "salary": data,
            "id": this.lastID
        })

    })
});
app.patch("/api/salary/unlock", (req, res, next) => {
    var errors = []
    var data = {
        salaryUserLocked : req.body.salaryUserLocked,
        startDate: req.body.startDate,
        endDate : req.body.endDate,
        salaryUserId : req.body.salaryUserId
    };
    var params = [
        data.salaryUserLocked,
        data.startDate,
        data.endDate,
        data.salaryUserId];
    var sql = `UPDATE salary SET
                salaryUserLocked = ?
                where (salaryDate between ? and ? ) and salaryUserId = ?`
    console.log( data.startDate + ' ' + data.endDate+ ' ' + data.salaryUserLocked + ' ' + data.salaryUserId);
    salarydb.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "salary": data,
            "id": this.lastID
        })

    })
});

// Root path
app.get("/", (req, res, next) => {
    res.json({"message": "Ok"})
});
app.delete("/api/salary/:id", (req, res, next) => {
    salarydb.run(
        'DELETE FROM salary WHERE salaryId = ?',
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message": "deleted", rows: this.changes})
        });
});

