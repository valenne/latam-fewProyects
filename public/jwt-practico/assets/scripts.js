let formJS = document.getElementById("formulario");

//Forma 1 de captura de evento

formJS.addEventListener("submit", async function (event) {
  event.preventDefault();
  let emailJS = document.getElementById("inputEmail").value;
  let passJS = document.getElementById("inputPass").value;
  const JWT = await postData(emailJS, passJS); // CREO EL JWT
  getPosts(JWT); // CONSULTO DATOS LLEVANDO EL JWT
  getAlbums(JWT);
});

// Valida usuario y contraseña desde API. En caso de ser exitoso genera token

const postData = async (email, password) => {
  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
    });
    const { token } = await response.json();
    localStorage.setItem("jwt-token", token);
    return token;
  } catch (err) {
    console.error(`Error: ${err} `);
  }
};

// Valida token desde API. En caso de ser exitoso genera posts ("registros") del usuario validado

const getPosts = async (jwt) => {
  try {
    const response = await fetch("http://localhost:3000/api/posts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt} `,
      },
    });
    const { data } = await response.json();
    if (data) {
      fillTable(data, "tablaInfo");
      toggleFormAndTable("formWrapper", "tableWrapper");
    }
    return data;
  } catch (err) {
    localStorage.clear();
    console.error(`Error: ${err} `);
  }
};

// obteniendo albums desde api

const getAlbums = async (jwt) => {
  try {
    const response = await fetch("http://localhost:3000/api/albums", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const { data } = await response.json();
    if (data) {
      let rows = "";
      $.each(data, (i, row) => {
        rows += `<tr>
            <td> ${row.id} </td>
            <td> ${row.title} </td>
            </td>`;
      });
      $(`#js-table-albums tbody`).append(rows);
    }
    return data;
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

// Rellenar tabla con datos

const fillTable = (data, table) => {
  let rows = "";
  $.each(data, (i, row) => {
    rows += `<tr>
    <td> ${i + 1} </td>
    <td> ${row.title} </td>
    <td> ${row.body} </td>
    </tr>`;
  });
  $(`#${table} tbody`).append(rows);
};

// Intercambiar aparicion de elementos

const toggleFormAndTable = (form, table) => {
  $(`#${form}`).toggle(); // cambia el display none a block o de block a none, dependiendo el estado que tiene
  $(`#${table}`).toggle();
};

// Comprobacion token al iniciar

const init = async () => {
  const token = localStorage.getItem("jwt-token");

  if (token) {
    getPosts(token);
  }
};

init();

let botonModal = document.getElementById("modalButton");
let modalContent = document.getElementById("modalContent");

botonModal.addEventListener("click", async function (event) {
  let email = "Telly.Hoeger@billy.biz";
  let pass = "secret";
  const JWT2 = await postData(email, pass);
  const postsUser = await getPosts(JWT2);
  let idUsuario = postsUser[0].id;
  modalContent.innerHTML += idUsuario;
});
