var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "passwords.db"


let passdb = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    }else{
        console.log('Connected to the "/passwords"/ SQlite database.')
        passdb.run(`CREATE TABLE passwords (
            passwordsId INTEGER PRIMARY KEY,
            passwordsMail TEXT,
            passwordPass TEXT,
            )`,(err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = `INSERT INTO users (
                passwordsMail,
                passwordPass
                ) VALUES (?,?)`
                passdb.run(insert, ["lfgn84@gmail.com","contrasena"])
            }
        })
    }
})


module.exports = passdb