const mysql = require("mysql");
var con = mysql.createConnection({
    host: "localhost",
    user: "student",
    password: "student",
    database: "web"
});
function insertRide(from, to, consumerID) {
    var sql = "INSERT INTO `web`.`ride_shares`" +
        "(start,finish,consumerID,providerID,status,estimated)" +
        "VALUES ('"+from+"','"+to+"','"+consumerID+"',null,'unclaimed','20');"
       /*/ "(`start`,\n" +
        "`finish`,\n" +
        "'consumerID',\n" +
        "'estimated',\n" +
        "'providerID',\n" +
        "'status') " +
        "VALUES\n" +
        "(\'" + from +
        "\', \'" + to +
        "\', \'" + consumerID +
        "\',\'20" +
        "\',null"+
        ", \'unclaimed\');\n"*/
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("ride inserted");
    });
    //show result
    con.query("select * from users", function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}
// insertRide("ala","bala",4);
module.exports=
    {
        insertRide,
    }