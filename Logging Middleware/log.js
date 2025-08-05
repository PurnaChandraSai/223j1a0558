const axios = require("axios");

const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMjNqMWEwNTU4QHJhZ2h1aW5zdGVjaC5jb20iLCJleHAiOjE3NTQzNzE4MTYsImlhdCI6MTc1NDM3MDkxNiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjI4OWUwYTkzLWY3YzItNGFjNi05MGJmLTU2MzczMGNjN2M5NiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImdhbmppIHB1cm5hIGNoYW5kcmEgc2FpIiwic3ViIjoiMzFkYWYxNDUtMzI5OC00MTk3LWJjOGUtMzAzMWYyNzlhNzQ4In0sImVtYWlsIjoiMjIzajFhMDU1OEByYWdodWluc3RlY2guY29tIiwibmFtZSI6ImdhbmppIHB1cm5hIGNoYW5kcmEgc2FpIiwicm9sbE5vIjoiMjIzajFhMDU1OCIsImFjY2Vzc0NvZGUiOiJ5dmhkZGEiLCJjbGllbnRJRCI6IjMxZGFmMTQ1LTMyOTgtNDE5Ny1iYzhlLTMwMzFmMjc5YTc0OCIsImNsaWVudFNlY3JldCI6IkFtYnpZelhtaHhuZGtTWkMifQ.Kie4whz3gz4Lo6hUICamaJb3iAIvceSW9N_M_uth0ys";

function Log(stack, level, packageName, message) {
  axios.post(
    "http://20.244.56.144/evaluation-service/logs",
    {
      stack: stack,
      level: level,
      package: packageName,
      message: message
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  ).then((res) => {
    console.log("Log success:", res.data);
  }).catch((err) => {
    console.error("Log failed:", err.response?.data || err.message);
  });
}

Log("backend", "error", "handler", "received string, expected bool");
