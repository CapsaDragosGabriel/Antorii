var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
        user: "student",
    password: "student",
    database: "web"
});


function createTokenValidator(minutesLimit) {
    var sql = "DROP EVENT IF EXISTS token_validator"

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("dropped token validator")

        sql = "CREATE EVENT IF NOT EXISTS token_validator\n" +
            "ON SCHEDULE EVERY 1 MINUTE\n" +
            "DO\n" +
            "UPDATE users\n" +
            "SET token = NULL,\n" +
            "created_token_time = NULL\n" +
            "WHERE TIMESTAMPDIFF(MINUTE,created_token_time,NOW()) >= " + con.escape(minutesLimit);

        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("token validator set")
        });

    });


}

function stopTokenValidator(){
    var sql = "DROP EVENT IF EXISTS token_validator"

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("dropped token validator")
    })
}


createTokenValidator(999)
//stopTokenValidator()