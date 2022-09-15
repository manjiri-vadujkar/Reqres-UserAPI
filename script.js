//as we can see fetch is promise based. Hence we an use Async await or .then.catch
//console.log(fetch("https://reqres.in/api/users"));

//fetch always success hence once we get response check if res.ok = true to decide if the api is success or not.
//fetch will not even fail for errors like 404 etc hence manual check needed.
fetch("https://reqres.in/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "User 1",
  }),
})
  .then((res) => {
    //console.log(res);
    return res.json();
  })
  .then((data) => console.log(data));

fetch("https://reqres.in/api/users?first_name=George")
  .then((res) => {
    //console.log(res);
    if (res.ok) {
      console.log("Success");
      return res.json();
    } else {
      console.log("Failed"); //check using api = "https://reqres.in/api/users/34"
    }
    //res.json();
  })
  .then((data) => console.log(data.data));
