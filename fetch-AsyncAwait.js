const getInput = document.querySelector("#getUserID");
const userDetailsDiv = document.querySelector(".userDetails");

//console.log(getInput, retrieveBtn);

async function getUserDetails() {
  //console.log("Btn Clicked");
  const userID = getInput.value;
  getInput.value = "";
  if (!userID) {
    alert("Please enter a userID");
    return;
  }
  const endpoint = new URL(`https://reqres.in/api/users/${userID}`);

  //in case authorization required. We used URL object above to be able to use the searchParams fucntionality
  //endpoint.searchParams.set("token", "YOUR_TOKEN_HERE");
  console.log(endpoint.toString());

  const response = await fetch(endpoint); //can also add, {header: {"header_name": "token"}} in case needed

  if (response.status === 404) {
    alert("User Not Found");
    return;
  }
  const data = await response.json();
  const userDetails = await data.data;
  createHTMLTable(userDetails);
}

function getAllUsers() {
  getInput.value = "";
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
    .then((data) => createHTMLTable(data.data));
}

function postUserDetails() {
  const fname = document.querySelector("#fname");
  const lname = document.querySelector("#lname");
  const email = document.querySelector("#email");

  fetch("https://reqres.in/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: fname.value,
      last_name: lname.value,
      email: email.value,
    }),
  })
    .then((res) => {
      //console.log(res);
      return res.json();
    })
    .then((data) => {
      alert(`User created with ID = ${data.id}`);
      fname.value = "";
      lname.value = "";
      email.value = "";
    });
}

function createHTMLTable(userData) {
  //console.log(userData);

  clearTable();

  let userTable = createCustomElement("table", ["userTable"]);
  //userTable.classList = "userTable";
  let header = createCustomElement("th");
  header.innerText = "UserName";
  userTable.appendChild(header);
  if (Array.isArray(userData)) {
    userData.forEach((user) => {
      let row = createCustomElement("tr");
      let data = createCustomElement("td");
      data.innerText = `${user.first_name} ${user.last_name}`;
      row.appendChild(data);
      userTable.appendChild(row);
    });
  } else {
    let row = createCustomElement("tr");
    let data = createCustomElement("td");
    data.innerText = `${userData.first_name} ${userData.last_name}`;
    row.appendChild(data);
    userTable.appendChild(row);
  }

  userDetailsDiv.appendChild(userTable);
}

function clearTable() {
  if (document.querySelector(".userTable")) {
    const oldTable = document.querySelector(".userTable");
    oldTable.remove();
  }
}

function createCustomElement(eleType, classList) {
  const newEle = document.createElement(eleType);
  newEle.classList = classList;
  return newEle;
}
