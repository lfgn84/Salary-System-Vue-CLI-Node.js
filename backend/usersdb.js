var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "users.db"


let usersdb = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the "users" SQlite database.')
        usersdb.run(`CREATE TABLE users (
            usersId INTEGER PRIMARY KEY,
            usersRange TEXT,
            usersName TEXT,
            usersLastName TEXT,
            usersPN TEXT,
            usersEmail TEXT,
            usersPhone TEXT,
            usersHiringDate TEXT,
            usersProjectName TEXT,
            usersFirstCostumer TEXT,
            usersLastCostumer TEXT,
            usersPriceHour REAL,
            usersPctLevel REAL,
            usersBruttoSalary REAL,
            usersEmployeerFee REAL,
            usersPaidVacation REAL,
            usersExtraPension REAL,
            usersInsurance REAL,
            usersSalaryTax REAL,
            usersCompetenceCost REAL,
            usersHealthSupport REAL,
            usersMobile REAL,
            usersLaptop REAL,
            usersMiscHardware REAL,
            usersMisc REAL
            )`, (err) => {
            if (err) {
                // Table already created
            } else {
                // Table just created, creating some rows
                var insert = `INSERT INTO users (
                usersId,
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
                usersMisc) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
                usersdb.run(insert, [0, "user", "Luis", "Gutierrez", "841026", "lfgn84@gmail.com", "0703487596", "26/03/2020", "PSS", "Prodeff", "Prodeff", 500, 0.65, 20000, 0.33, 0.12, 0, 0, 0.33, 0, 0, 0, 0, 0, 0])
                usersdb.run(insert, [1, "owner", "Allen", "Kalasho", "921026", "allen@prodeff.com", "078976662", "12/08/2015", "PSS", "Volvo Cars", "Stena Lines", 500, 0.80, 60000, 0.33, 0.12, 0, 0, 0.33, 0, 0, 0, 0, 0, 0])

            }
        })
    }
})


module.exports = usersdb