// solicitar jwt para validar usuario
const postData = async (email, password) => {
  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
    });

    const { token } = await response.json();
    localStorage.setItem("jwt-token", token);
    return token;
  } catch (error) {
    console.log("Error al cargar data", error);
  }
};

/*******************************************************/
// solicitar informacion api al cliclear situacion chile
const dataCovidPaisConfirmed = async (jwt) => {
  try {
    // peticion data url-api
    const response = await fetch("http://localhost:3000/api/confirmed", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const { data } = await response.json();
    return data;
  } catch (err) {
    console.log("OH!, un error a ocurrido API/CONFIRMED", err);
  }
};

/*******************************************************/
const dataCovidPaisDeaths = async (jwt) => {
  try {
    const response = await fetch("http://localhost:3000/api/deaths", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const { data } = await response.json();
    return data;
  } catch (err) {
    console.log("OH!, un error a ocurrido API/DEATHS", err);
  }
};

/*******************************************************/
const dataCovidPaisRecovered = async (jwt) => {
  try {
    const response = await fetch("http://localhost:3000/api/recovered", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const { data } = await response.json();
    return data;
  } catch (err) {
    console.log("OH!, un error a ocurrido API/RECOVERED", err);
  }
};

export {
  postData,
  dataCovidPaisConfirmed,
  dataCovidPaisDeaths,
  dataCovidPaisRecovered,
};
