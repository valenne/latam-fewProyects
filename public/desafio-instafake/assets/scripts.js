// 1. evento submit

document.getElementById("js-form").addEventListener("submit", async (event) => {
  // evita que se envie la informacion
  event.preventDefault();

  // capturando email y password
  const email = document.getElementById("input-email").value;
  const password = document.getElementById("input-password").value;
  // 3
  const JWT = await tokenData(email, password);
  // 5
  getPhotos(JWT);
});

// obteniendo mas fotos

// 2. llamando a la api, para recibir token

const tokenData = async (email, password) => {
  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
    });
    const { token } = await response.json();
    localStorage.setItem("jwt-token", token);

    return token;
  } catch (error) {
    console.log("Un error que dice", error);
  }
};

// 4 Obteniendo los datos requeridos: Photos
const getPhotos = async (JWT) => {
  try {
    const response = await fetch(`http://localhost:3000/api/photos`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
    });
    const { data } = await response.json();
    console.log(data);
    if (data) {
      togleBtnClear("btnClear", "btnAnterior", "btnSiguiente");
      //  7
      fillInformation(data, "putHereInformation");
      // 9
      toggleFormAndTable("js-form-wrapper", "putHereInformation");
    }
  } catch (error) {
    localStorage.clear();
    console.log("Error seccion getPhotos", error);
  }
};

// 6 crear estructura de datos

const fillInformation = (data, id) => {
  const dataTemplate = document.getElementById(id);
  dataTemplate.innerHTML = ` <div
  class="insta__header"
  style="display: flex; justify-content: space-between"
>
  <p style="font-weight: bold">Feed</p>
  <p style="font-size: 10px">Cerrar</p>
</div>`;

  data.forEach((elem) => {
    console.log(elem.url);
    dataTemplate.innerHTML += `
    
    <div class="insta__body" style="border: 1px solid #88888882">
      <img src="${elem.url}" alt="Photo" style="align-items: center;" />
      <p
        class="insta__autor"
        style="font-size: 12px; margin-top: 15px; margin-left: 10px"
      >
        Author: ${elem.author}
      </p>
    </div>
  
  <br>`;
  });
};

//8 hidden form

const toggleFormAndTable = (form, table) => {
  $(`#${form}`).toggle();
  $(`#${table}`).toggle();
};

// 12
const togleBtnClear = (btnClear, btnAnterior, btnSiguiente) => {
  $(`#${btnClear}`).toggle();
  $(`#${btnAnterior}`).toggle();
  $(`#${btnSiguiente}`).toggle();
};

// 10
const init = async () => {
  const token = localStorage.getItem("jwt-token");
  if (token) {
    getPhotos(token);
  }
};

init();

// 11

document.getElementById("btnClear").addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});
