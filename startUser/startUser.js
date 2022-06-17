async function logout()
{

    const data={
        token: localStorage.getItem('token')
    }
    console.log(data.token);
    const response = await fetch('http://localhost:8000/api/logout', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'no-cors', // no-cors, *cors, same-origin
        // headers: {
        //     'Content-Type': 'application/json'
        //     // 'Content-Type': 'application/x-www-form-urlencoded',
        // },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then(r => r.json())
        .catch(e => {
               console.log('error');
               console.log(e);
        });
    localStorage.removeItem('token');

    window.location.href="http://127.0.0.1:8000/mainHome/mainHome.html";
}