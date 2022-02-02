import { dataCovidFromApi, dataCovidCountries } from "./modulo-api.js";
import {
  fillInformation,
  covidActive,
  contentOfNodes,
} from "./module-functions.js";

/* ~~~~~~~~~~GRAFICO CANVAS PRINCIPAL~~~~~~~~~~~~~~~ */
async function graphCanvas() {
  // casos covid de paises
  const responseData = await dataCovidFromApi();
  const dataCovid = responseData;
  // console.log("Casos Covid", dataCovid);

  // filtro aplicado a la data para uso en grafico
  const covidConfirmados = covidActive(dataCovid, 1000000);
  // console.log("covidconfirmados", covidConfirmados);

  // mapeando "label": pais, y: casos
  const dataPoints = covidConfirmados.map((label) => {
    return { label: label.location, y: label.confirmed };
  });
  console.log(dataPoints);

  var chart1 = new CanvasJS.Chart("chartContainer1", {
    exportEnabled: true,
    animationEnabled: true,

    title: {
      text: "Covid 19 - Actives Cases/Country",
    },
    toolTip: {
      content: "{name}:{y}",
    },
    axisX: {
      title: "Countries",
      labelFontSize: 12,
      titleFontSize: 24,
      interval: 1,
      labelAngle: 120,
    },
    axisY: {
      title: "Confirmed - Persons",
      labelFontSize: 14,
      titleFontSize: 24,
      titleFontColor: "#212529",
      lineColor: "#212529",
      labelFontColor: "#212529",
      tickColor: "#212529",
      includeZero: true,
    },
    toolTip: {
      shared: true,
    },
    // esconder data
    legend: {
      cursor: "pointer",
      itemclick: toggleDataSeries,
    },
    data: [
      {
        type: "column",
        name: "Confirmed",
        yValueFormatString: "#,##0.# Persons",
        dataPoints: dataPoints,
      },
    ],
  });
  chart1.render();

  function toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    e.chart1.render();
  }

  // llenado tabla

  fillInformation(dataCovid, "dataTable");
}

graphCanvas();

// async function ModalGraphCanvas(country) {
//   const responseData = await dataCovidCountries(country);
//   console.log(responseData);
// }

// ModalGraphCanvas("chile");

/* ~~~~~~~~~~GRAFICO CANVAS MODAL~~~~~~~~~~~~~~~ */
async function modalGraph(data, pais) {
  // map label and y
  // delete data.location;

  // const [dataPoints] = data.map((headers) => {
  //   return { y: Object.values(headers), label: Object.keys(headers) };
  // });
  // console.log(dataPoints);

  var chart2 = new CanvasJS.Chart("chartContainer2", {
    animationEnabled: true,
    title: {
      text: `Covid in ${pais}`,
    },
    data: [
      {
        type: "pie",
        startAngle: 240,
        yValueFormatString: '##0 - "Persons"',
        indexLabel: "{label} {y}",
        dataPoints: [
          { y: data.confirmed, label: "Confirmed:" },
          { y: data.deaths, label: "Deaths:" },
          { y: data.recovered, label: "Recovered:" },
          { y: data.active, label: "Active:" },
        ],
      },
    ],
  });
  chart2.render();
}

window.detailsModal = async (i) => {
  const countriesNames = contentOfNodes("tbody>tr>td:first-child");
  // console.log(countriesNames);
  const responseData = await dataCovidCountries(countriesNames[i]);
  console.log(responseData);
  modalGraph(responseData, countriesNames[i]);
};
