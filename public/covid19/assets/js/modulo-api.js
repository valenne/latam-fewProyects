/* ~~~~~~~~~~CONSUMO INFOR API~~~~~~~~~~~~~~~~ */
const CovidApiUrl = "http://localhost:3000/api/total";

/* ~~~~~~~~~~TOTAL INFORMATION~~~~~~~~~~~~~~ */
const dataCovidFromApi = async () => {
  try {
    // peticion api
    const response = await fetch(CovidApiUrl, {
      method: "GET",
    });
    // mide el tipo de respuesta, y entrega un resultado
    if (response.status === 200) {
      const { data } = await response.json();
      return data;
    } else if (response.status === 404) {
      console.log("Informacion no encontrada");
    }
    // caputura u entrega el error
  } catch (err) {
    console.log("Error al cargar API", err);
  }
};

/* ~~~~~~~~~~COUNTRIES INFORMATION~~~~~~~~~~~~~~~ */

const dataCovidCountries = async (country) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/countries/${country}`,
      {
        method: "GET",
      }
    );
    // mide el tipo de respuesta, y entrega un resultado
    if (response.status === 200) {
      const { data } = await response.json();
      return data;
    } else if (response.status === 404) {
      console.log("Informacion no encontrada");
    }
    // caputura u entrega el error
  } catch (err) {
    console.log("Error al cargar API", err);
  }
};

export { dataCovidFromApi, dataCovidCountries };
