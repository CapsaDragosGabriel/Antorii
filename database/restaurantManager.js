var mysql = require('mysql');
const {getRestaurantsOrderByProfit} = require("./stats");
var con = mysql.createConnection({
    host: "localhost",
    user: "student",
    password: "student",
    database: "web"
});
function itemAvailability(name, status) { //status can be checked with an allowlist


    var sql = "UPDATE `web`.`items`\n" +
        "SET\n" +
        "`available` = ? WHERE `name` = ?;"

    con.query(sql,[status,name] ,function (err, result) {
        if (err)  return 0;
        else {console.log("availability changed")
        return 1;}
    });
    return 1;

}
/*
async function newInsertRestaurant(name,photo){
    var sql = "INSERT INTO `web`.`restaurants`\n" +
        "(`name`,`photo`)\n" +
        "VALUES(?, ?);"
   let val= new Promise((resolve, reject) => {
    con.query(sql,[name,photo], function (err, result) {
        if (err) throw err;
        resolve(1);
    })});
val.then(r=>
{
    if(r==1) {
        return new Promise((resolve) =>  con.query("select * from restaurants where name=\'" + name+"\';", function (err, result) {
            if (err) throw err;

            console.log(result);
            resolve(result);
        }
    ))

    }
}).then(f=>{return f});
}
*/
// getRestaurantsOrderByProfit().then(r=>{
//     console.log(r);
// })
function insertRestaurant(name,photo) {
    var sql = "INSERT INTO `web`.`restaurants`\n" +
        "(`name`,`photo`)\n" +
        "VALUES(?, ?);"
    try{
    con.query(sql,[name,photo], function (err, result) {
        if (err) return 0;
       else {console.log("restaurant inserted")
       return 1;
       };
    });
    }
    catch(err){console.log("couldn't do it");
    }
    //show result
    return 1;

}

async function insertRestaurantPromise(name,photo) {
    return new Promise((resolve)=>{
        var sql = "INSERT INTO `web`.`restaurants`\n" +
        "(`name`,`photo`)\n" +
        "VALUES(?, ?);"

        try{
            con.query(sql,[name,photo], function (err, result) {
                if (err) resolve= 0;
                else {console.log("restaurant inserted")
                    resolve(1);
                }
            });
        }
        catch(err){resolve=0;
            console.log("couldn't do it");
        }
    }).then(r=>console.log(r));
}
function restaurantAvailability(name, status) { //status can be checked with an allowlist

    getRestaurantByName(name).then(f=>{

        var sql = "UPDATE `web`.`restaurants`\n" +
            "SET\n" +
            "`available` = ? WHERE `id` = ?;"
        if (f!=undefined)
        con.query(sql,[status,f.id] ,function (err, result) {
            if (err) throw err;
            console.log("availability changed");
        });
    })

}
async function getAllRestaurants(){
    return new Promise((resolve, reject) => {

        sql = "select * from restaurants where available='y' ";
        con.query(sql, function (err, result) {
            if (err) throw err;
            // console.log(result);

            resolve(result)
        });


    })
}
async function getRestaurantByName(restaurantName){
    return new Promise((resolve, reject) => {

        sql = "select * from restaurants where name = " + con.escape(restaurantName) + ";";
        con.query(sql, function (err, result) {
            if (err) throw err;
            // console.log(result);

            resolve(result[0])
        });


    })
}

async function getItemsFromRestaurantByName(restaurantName){
    return new Promise((resolve, reject) => {
        getRestaurantByName(restaurantName).then( r => {
            let restaurantID = r.id;

            sql = "select * from items where available='y' and restaurantID = " + con.escape(restaurantID) + ";"
            con.query(sql, function (err, result) {
                if (err) throw err;
                // console.log(result);

                resolve(result)
            });


        })
    })
}
async function getItemIDFromRestaurantByName(restaurantName,itemName){
    return new Promise((resolve, reject) => {
        getRestaurantByName(restaurantName).then( r => {
            let restaurantID = r.id;

            sql = "select id from items where restaurantID = ? and name= ?;"
            con.query(sql,[restaurantID,itemName] ,function (err, result) {
                if (err) throw err;
                // console.log(result);

                resolve(result)
            });


        })
    })
}
async function getItemIDFromRestaurantID(restaurantID,itemName){
    return new Promise((resolve, reject) => {
        sql = "select id from items where restaurantID = ? and name= ?;"
        con.query(sql,[restaurantID,itemName], function (err, result) {
            if (err) throw err;
            // console.log(result);
            //console.log("\n\nAM GASITA:" + JSON.parse(JSON.stringify(result)));
            resolve(result)
        });



    })
}
async function getReviewsRestaurant(restaurantID){
    return new Promise((resolve, reject) => {
        sql = "select feedback_restaurant from orders where restaurantID = ? and feedback_restaurant is not null;"
        con.query(sql,[restaurantID], function (err, result) {
            if (err) throw err;
            // console.log(result);
            //console.log("\n\nAM GASITA:" + JSON.parse(JSON.stringify(result)));
            resolve(result)
        });



    })
}
// getReviewsRestaurant(3).then(r=>console.log(r));
async function getRestaurantsSortedByNrOfOrders(){
    return new Promise((resolve, reject) => {
        sql = "select * from restaurants r order by (select count(*) from orders where restaurantID = r.id) desc;"
        con.query(sql, function (err, result) {
            if (err) throw err;
            resolve(result)
        });
    })
}



// getAllRestaurants().then(r=>{
//     console.log(r);
// })
// insertRestaurant("McDonalds","data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBIQEhERERERFBIRGBQSERIQEREREhESGBQbGRgYGhgbIS0kGyEqHxkYJTklKi4xNDQ0GyM6PzozPi0zNDEBCwsLEA8QHxISHTMqIyszMTEzMzMzMzQzMzEzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzM//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABgcBBAUDAv/EAEMQAAIBAgIFBwcKBQQDAAAAAAABAgMRBAYFEiExURNBUmGBkaEicXKxssHRFCMyQmJzgpKiwhYzNFPhY5Oz0kODo//EABsBAQACAwEBAAAAAAAAAAAAAAAFBgEDBAIH/8QALxEAAgIAAwUGBgMBAAAAAAAAAAECAwQFERIhQWFxMTJRscHwEyMzgZGhItHhFf/aAAwDAQACEQMRAD8Ai+Nxk8RUlVqzc5zblKT48FwXNY1gCH7T6dGKitF2AAGTIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMmAAe/yqp/cn/uT+IPAA8fDh4L8AAA9gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWAANjCYOdaShTi5SfMtyXFvmRJcPkyTSdSrGL6MIudu129RptxFdffehotxNdXeZEgSjGZOqxTdOpCdvq2cJPzb0/AjdajKnJxkpRlHZJSVmjNV0LO40zNV9dncep5gA2m4AAAAHc0blqviEpWVOD3SqXvJcVH42Nc7IwWsnojXZbCtayehwwTF5K2bK61uuls9Zw9KaDrYbbKOtF7FOG2PVfga68VVY9Iy3mqvF02PZi95ygAdB0gAAAAAAAAAAAAAAAAAAAAA2tH4KWIqRpwW2W980YrfJ9SNaxYeVNGchS15L5yqk3xjD6sff2nLisQqa9rjw6nNi8R8GGvHgdDRejYYaChBbfryf0py4sY7StDD2VWaTe6KWtK3Gy226z00hi40KU6r3RV0uk+Zdrsir8Zip1pyqTd3N3fBdS6iJwuFeIk52Pd5siMLhniJOUnu82Whg8bTxEdalNTW522NPg09qNPTmhoYqPNGol5FT3PiiCaF0jLDVYzTeq9ko9KHP2reizadRTipRd4yScWudPczziKJYWalB7uH9e+1GMRTLDTTi+j9PfAqfE0JUpyhKLjKDtJPmZ4k5zjovlIfKILyoJKpb60L7+z1X4EHJrD3q6G0vvyJnDXq6G1+epgyjB2staK+U1Vrq9KnaUutX2R7X4GyyahFyl2I22WKuLlLsR1sraATUa9aO/bSpvd1TkvUu0l8pJJtuyW1t7EkZStsW7mIdnLSrbWHg3ZJSq255PdH3vzogFt4u7RvReS9/sr6+JirdG/6S9/s71LMGFlLUVZazdk3dQb6pNW8TpTipJppNNWae1NFQ3J9lDSrrU+SnK86VrN75U/8bu43YzAKqG3B9nab8XglVHbi9fHU4OZtB/J5a9NN0Zvz6suj5uBHi2sXhYVqc6U1eM00/iusq/SODlQqSpy3wdk+lHen3HbgMU7Y7Mu8v2vE7MBifiR2Jdq/aNUAEgSAAAAAAAAAAAAAAAAABgHYy3o/wCUYiCavGn5dThaO5drt4lk2I7kzBcnQdRryqzv/wCtbF43faSIruYXbdrXBbv7K9jbdu1+C3f2RDPOL/l0E/8AUn23UV7XciHM6eYcVyuJqvmUmo+aHk+5vtOWTeFr+HVGPveTGEr2Kkvv+QWBk3G69B02/Kou34Htj6muwr9EgybitTEqDfk1YuH4l5S9T7zXja9ul8t/4PGOr26Xy3lgTgpJpq6aaae5p70VdpjAvD150uZO8OuD2r4dhaZFM74LWhCslti9SfoS3PsfrIvLbtm3Z4PzIzAW7FuzwfnwIStuwszLuj/k9CKaWvPy6npPm7FZEJy3geXxEE15MfLn5otNLvt4llHRml25Vrq/Q35nbq1Wur9DxxVeNOnOct0IuT7EVViq8qk5zl9KUnredu5Os6Yrk8OorfVkk/RXlP1JdpAGbMsq0g5+Pkv9NuWV6Qc/HyX+mDpaCxnIYiE72jdRn6Mtj9z7DmjgSUoqSafEkZwU4uL4lwkVztgNaEa8VthaFTrg3sfY/WdvQmJ5XD0Zt3eqoy9JbH4o2MVQjVhOnL6M4uL7UVmqbou1fB6P1K1XY6bU/B/4ypWD2xNCUJyhL6Sk4S86djxLOWdPXeAAZAAAAAAAAAAAAAPWhSc5xivpSaivO3Y8jvZQw3KYmMrbKalU7dy9fgarbNiDn4Gu6exBy8CfYaiqcIU4q0YRUUupKx846vydKpN/+OMpdyNg4mba2rhZrnqOMO93fgmViqPxLUnxZWa4bc1HxZXUm223tb2t8WfIBbC1A2MFX5OpTqdCcZdid34GuFzHlrgYaTWjLgTv2mtpLDKtRq039eLS6nzPvPPQ1flMPQle71Ip+dbH4o3ip76580/IqrTjLoRjJWD1IVarVnOTgr8yjv8A1N9xJz4pUowWrFWV27LjJtvxbPs94i34tjn4nq612Tc3xILnjE61aEOaENq62/hFEYOnmOrr4utK+6bS/BaPuOYWTDR2aorkWLCw2Korl/oABvN5O8j4jWoThzwkpLqjOPxTJMQXI1a1apHpwffFq3rZOyt5hDZvfPeV3Gw0ulz3lfZywfJ4jXW6rFS/Ful7u8jxPs7YXWoRqJbaU1f0ZbH46pAWTGCs26U/Dd+CXwNm3SuW4AA7DrAAAAAAAAAAAABNciYe0K1V/WagvNFXfteBCkWVlehyeFpLnknN/i3eFiPzKelOnizgzKelWni0dgime6tqdKH2pT/LG37iVkGz1UvWow6MF3yk/giLy+Ot65asjcDHW+JFgAWMsIACALCyZWvhVHoTku9KX7iQESyJU8ivDg1PvVv2ktKzjY7N8it4qOl0lzB8VJWTfBN+B9mjpepq4evPhTnbz2aOeK1aRzpavQq/ET1pSl05OXe7+88w97Bbi2aaAAAHWyzW1MVR27JSaf4ti8bFmFTYCpqVaU+hOMu6aZbBCZrH+cXy9+ZC5mv5p8jU0rQ5WhVp87hJL0rXXjYqp72XAVTpOhyVetDmjKaXm1tnhY95VPvR6P3+j3lcu9Ho/f6NQAEyS4AAAAAAAAAAABmKu0lvexFtYSlqU4Q5oQjH8sUvcVhomlylejDpThfza6bLVIbNZd2PV+hD5pLfGPVmSus31NbFzXRjGH6VL9xYpWGYqmtiq7+213bPcacrXzW+R4y1fNb5eqOYACfJsABAEqyJUtVrR6VO/bGS+JOCvcmTtikulGa9T9xYRXcyWl2vJEBmC0ufRA42aqurhKtt71Y/qV/C52SPZ1nbDW6VRLujJ+458KtboLmjRh1rbFc0V8wAWkswABkDmZbeEqa9OnLpRjLvVypVzFo6CnrYbDy/04386ViJzVfwi+ZFZpH+MX1N8rrOFHUxU30oxn+39pYxCc90rTpSt9KDi36LuvaOTLJaXaeKZy5e9LlzTImAwWAnwADIAAAAAAAAMA7GVqeti6PCN5Psjs8bFkkByTG+Jb6MJvvlFe8n5AZnLW3TwRA5i9btPBIwVRpKetWrS4zqP9bLWk7JvhtKkrSvKb4yb8TdlS3zfT1N2Vr+Un0PIAE0TAABhg62V5WxdB9bXfBr3lmFXaAdsVh39qK73YtEg81XzIvl6kJmS+YunqwRXPc/mqUeM2+6L+JKiH59l/Tx9N+pHNgFriI/fyOfBrW+PvgQ0BgsqLGAAZALIypK+DpdWuu6RW5YWTJXwtujOa9/vI7M18n7oj8zXyl1JARfPVP5mnPoylHzKUf8IlBwM5QvhW+jOD73q+8iMG9L49SKwr0ui+ZXpgAs6LKAAZAAAAAAAAABLMhx+crvhCK75f4JsQ/IcdmIfoImBW8wet7+3kV7HPW+X28jxxLtCb4Rl6ipG9r85bGPlalWfCnUf6WVNzs7cp7suqOvK1uk+nqAAS5LAAAG7od2xOH+8p/8iLUKo0Y7VqL4Tg//AKItcg81X849CGzPvR6GSFZ9l5dBfZk/1E1IPnx/O0F9j9zNGXfXXRmjALW9ffyIqACxlgAAABPMjyvh5rhUfsQfvIGTrIr+ZqLhNPvgvgcGZL5D6o4cx+j90Sg5OZ4a2ErLglLuafuOsaGno3w2I6qUn3RuQVD0si+aISt6TT5oqwGXzmC1lqAAMmAAAAAAAADAJvkRfNVX9qK/S/iSsi+Rf5FT7xexElBWcc/nyK5i/rSNTSjth8R91V/42VTLey1NL/0+I+6q+wyq3vZI5T3ZfbyO/K+5LqjAAJYlAAADYwDtVpvhKPtItkqGlNxakt8WpK/FO531m/E8KX+3L/sRuOws7nHY4EdjsNO5pwLAILnz+fS+7j7cjy/i/E9Gn+SX/Y5WlNJzxUlKpq6yjqLVTStdvnfWacHgrKrduWmm/iasLg7K7NqWmm80WAwS5LAAGQCbZEfzdZdcfZISTTIb8msuuHqZxY/6EvfE4sw+i+q8yXGppON8PiFxpVV+hm2a+OV6VVcYVF+lldj2ogY9qKme9mAwW4tYABkAAAAAAAIAwwSLL+n4YSnKEoSm5y17xcVZaqVtvmOt/GlL+zU/PAg9wctmDpnJykt75nJPA1Tk5NPV8yY47NlOrSq01TmnOMopuUWlrJq5D2LmDbTRCpaQRtpw8KU1DiAAbjcAAAAAAAAAAAYAABkA72XdNwwaqKUJT5Rxa1Wlay6zgg121xsjsy7DxbXGyOzLsJx/GlL+zU/PA+MRm+lOEo8lNOScfpw51YhQOVZfQnrp+2cv/Pp8H+Q0ADtO0AAyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADLRgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3dMf1Ff72p7RpAGH2mun6cei8gADJsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/Z")
// 1
// insertRestaurant("KFC","data:image/png;base64,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")
// 3
// insertRestaurant("Noodle","data:image/jpeg;base64,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")
// 2
// insertRestaurant("Spartan","data:image/jpeg;base64,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")
// 5
// insertRestaurant("Carul cu burgeri","data:image/jpeg;base64,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")
// 4

// getRestaurantsSortedByNrOfOrders().then(r => {
//     console.log(r)
// })

module.exports={
    getAllRestaurants,
    getRestaurantByName,
    getItemIDFromRestaurantByName,
    getItemsFromRestaurantByName,
    getItemIDFromRestaurantID,
    // newInsertRestaurant,
    insertRestaurant,
    restaurantAvailability,
    itemAvailability,
    getReviewsRestaurant,
    insertRestaurantPromise
}