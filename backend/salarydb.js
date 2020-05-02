var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "salary.db"


let salarydb = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the "salary" SQlite database.')
        salarydb.run(`CREATE TABLE salary (
            salaryId INTEGER PRIMARY KEY,
            salaryUserId INTEGER,
            salaryDate "DATE",
            salaryProject TEXT,
            salaryHourFare INT,
            salaryWorkedHours INT,
            salaryIncome INT
            )`, (err) => {
            if (err) {
                // Table already created
            } else {
                // Table just created, creating some rows
                var insert = `INSERT INTO salary (
                salaryUserId,
                salaryDate,
                salaryProject,
                salaryHourFare,
                salaryWorkedHours,
                SalaryIncome
                ) VALUES (?,?,?,?,?,?)`
                salarydb.run(insert, [0, "2020-04-02","PSS", 478, 8, 3824])
            }
        })
    }
})


module.exports = salarydb