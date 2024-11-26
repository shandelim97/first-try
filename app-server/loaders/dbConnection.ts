import mysql from 'mysql2'

require('dotenv').config()

/**
 * @deprecated @function
 * Connect to MySQL database using mysql2.
 */
function pingDb() {
    let dbConnection = mysql.createConnection({
        host: 'localhost',
        user: 'audrian',
        password: 'STRONGpassword123',
        database: 'whatsapp'
    })

    dbConnection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err)
        } else {
            console.log('Connected to DB')
            dbConnection.end()
        }
    })
}

export default pingDb
