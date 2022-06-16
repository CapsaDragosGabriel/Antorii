function logout()
{
    localStorage.removeItem('token');
    window.location.href="http://127.0.0.1:8000/mainHome/mainHome.html";
}