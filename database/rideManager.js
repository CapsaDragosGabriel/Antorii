const mysql = require("mysql");
var con = mysql.createConnection({
    host: "localhost",
    user: "student",
    password: "student",
    database: "web"
});
async function getRide(consumerID)
{
    return new Promise((resolve, reject)=>{
        var sql = "select * from ride_shares where consumerID = \'" + consumerID + "\'";
        con.query(sql, function (err, result) {
            if (err) throw err;
            if (result.length!=0)
                resolve(JSON.parse(JSON.stringify(result)));
            else
                resolve(null);
        });
    })

}
async function changeRideStatus(id,string){
    var sql = "update ride_shares set status = \'" + string + "\' where id = \'" + id + "\'";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
}
async function getUnclaimed(){
    return new Promise((resolve, reject)=>{
        var sql = "select * from ride_shares where status = \'unclaimed\'";
        con.query(sql, function (err, result) {
            if (err) throw err;
            if (result.length!=0)
                resolve(JSON.parse(JSON.stringify(result)));
            else
                resolve(null);
        });
    })
}
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
// changeRideStatus(3,"unclaimed");
// insertRide("boom","chow",4);
module.exports=
    {
        getRide,
        getUnclaimed,
        insertRide,
    }