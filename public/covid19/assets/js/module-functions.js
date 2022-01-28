/* ~~~~~~~~~~~~~~~FUNCIONES~~~~~~~~~~~~~~~~ */
/* ~~~~~~~FUNCION PARA LLENAR TABLA~~~~~~~~ */

function fillInformation(data, id) {
  const dataTemplate = document.getElementById(id);
  dataTemplate.innerHTML = `
    <tr>
      <th>Country</th>
      <th>Confirmed</th>
      <th>Deaths</th>
      <th>Recovered</th>
      <th>Active</th>
      <th>Details</th>
    </tr>
 `;

  data.forEach((row, i) => {
    dataTemplate.innerHTML += `
    <tr>
      <td>${row.location}</td>
      <td>${new Intl.NumberFormat().format(row.confirmed)}</td>
      <td>${new Intl.NumberFormat().format(row.deaths)}</td>
      <td>${new Intl.NumberFormat().format(row.recovered)}</td>
      <td>${new Intl.NumberFormat().format(row.active)}</td>
      <td>
        <a class="openModal" onclick="detailsModal(${i})" href="#" data-bs-toggle="modal" data-bs-target="#staticBackdrop">See Details
        </a>
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Covid Information</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
        <div id="modalInfo" class="modal-body">
        <div
        id="chartContainer2"
        style="height: 200px; width: 100%; margin: 0 auto"
      ></div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div></td>
  </tr>`;
  });
}

function fillModalGraph(data, id, graphFunc) {
  const dataModal = document.getElementById(id);
  dataModal.innerHTML = "";
  data.forEach((pais) => {
    dataModal.innerHTML = graphFunc;
  });
}

/* ~~~~~~~~~~FUNCION FILTRADO~~~~~~~~ */

function covidActive(info, num) {
  const covidFlter = info.filter((paises) => paises.confirmed > num);
  return covidFlter;
}

/* ~~~~~~~~~CONTENT OF NODES~~~~~~~ */
function contentOfNodes(id) {
  var tds = document.querySelectorAll(id);
  return Array.prototype.map.call(tds, function (t) {
    return t.textContent;
  });
}

export { fillInformation, covidActive, fillModalGraph, contentOfNodes };
