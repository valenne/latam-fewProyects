import {
  postData,
  dataCovidPaisConfirmed,
  dataCovidPaisDeaths,
  dataCovidPaisRecovered,
} from "./modulo-chile-apis.js";
import {
  validation,
  init,
  postValidationDisplayNone,
  toDataPoints,
} from "./modulo-chile-function.js";

/*******************************************************/
// capturando login info, recibiendo y guardando jwt
const form = document.getElementById("js-form");
// elementos a tratar post validacion token
const postValidation = document.getElementsByClassName("post_validation");
// console.log("Postvalidation", postValidation);

// accediendo al evento submit y validando usuario
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  // accediendo a los datos del usuario
  const email = document.getElementById("js-input-email").value;
  const password = document.getElementById("js-input-password").value;
  // llamando al modulo-chile-jwt, para generar token
  const JWT = await postData(email, password);
  // valida usuario, si existe en base de datos, esconde y agrega element al dom
  const validationUser = validation(JWT, form, postValidation);

  if (validationUser) {
    console.log("Entrado...");
  } else {
    console.log("Usuario sin permisos");
  }
});

/*******************************************************/
// valida si existe token en localstorage, si existe, esconde elementos del menu
init(postValidation);

/*******************************************************/
// cargar datos desde api, para tenerlos listos al desplegar grafico
setTimeout(async () => {
  const token = localStorage.getItem("jwt-token");

  const confirmed = await dataCovidPaisConfirmed(token);
  const datapointsConfirmed = toDataPoints(confirmed);
  const deaths = await dataCovidPaisDeaths(token);
  const datapointsDeaths = toDataPoints(deaths);
  const recovered = await dataCovidPaisRecovered(token);
  const datapointsRecovered = toDataPoints(recovered);

  Promise.all([confirmed, deaths, recovered])
    .then(graphPais(datapointsConfirmed, datapointsDeaths, datapointsRecovered))
    .catch((error) => console.log(`Error Promise All`, error));
}, 1000);

// capturando elemento "Situacion chile", y desecandenando evento click
const triggerInfo = document.getElementById("getDataPais");
triggerInfo.addEventListener("click", async () => {
  const hiddenSections = document.querySelectorAll(".post_validation--sc");
  // console.log("Nodos grafico y tabla", hiddenSections);
  postValidationDisplayNone(hiddenSections);
  const graphOnlyCountry = document.getElementById("chartContainer3");
  graphOnlyCountry.style.display = "block";

  // accediendo y tratando informacion desde api
});

/*******************************************************/
// al interactuar con cerrar session, borra jwt token y recarga webpage
document.getElementById("CerrarSesion").addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

/*******************************************************/
// config grafico pais
async function graphPais(confirmed, deaths, recovered) {
  var chart3 = new CanvasJS.Chart("chartContainer3", {
    title: {
      text: "Covid19 - Chile",
    },
    axisX: {
      valueFormatString: "DD MM YYYY",
      tittle: "dias/mes/año",
    },
    axisY2: {
      title: "Persons",
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: "pointer",
      verticalAlign: "top",
      horizontalAlign: "center",
      dockInsidePlotArea: true,
      itemclick: toogleDataSeries,
    },
    data: [
      {
        type: "line",
        axisYType: "secondary",
        name: "Confirmed",
        showInLegend: true,
        markerSize: 0,
        yValueFormatString: "#,### persons",
        dataPoints: confirmed,
      },
      {
        type: "line",
        axisYType: "secondary",
        name: "Deaths",
        showInLegend: true,
        markerSize: 0,
        yValueFormatString: "#,### persons",
        dataPoints: deaths,
      },
      {
        type: "line",
        axisYType: "secondary",
        name: "Recovered",
        showInLegend: true,
        markerSize: 0,
        yValueFormatString: "#,### persons",
        dataPoints: recovered,
      },
    ],
  });
  chart3.render();

  function toogleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    chart3.render();
  }
}
