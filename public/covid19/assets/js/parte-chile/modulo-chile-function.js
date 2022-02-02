function validation(JWT, form, obj) {
  if (JWT != undefined) {
    // show and hidden class names
    SetBlockAndNone(obj);
    // hidden modal window
    $("#myModal").modal("hide");
    return true;
  } else {
    form.reset();
    alert("Usuario no registrado, intentalo nuevamente...");
    return false;
  }
}

/*******************************************************/
// validar si existe token para mostar informacion
const init = (obj) => {
  const token = localStorage.getItem("jwt-token");
  if (token) {
    SetBlockAndNone(obj);
  }
};

/*******************************************************/
// display block y none despues de la validacion
function SetBlockAndNone(obj) {
  Array.from(obj).forEach((x, i) => {
    if (x.innerHTML.includes("Iniciar Sesion")) {
      // console.log("AAAAAAAAAAA");
      x.classList.toggle("post_validation--none");
    } else if (x.innerHTML.includes("Situacion Chile")) {
      // console.log("BBBBBBBBBBBB");
      x.classList.toggle("post_validation--none");
    } else if (x.innerHTML.includes("Cerrar Sesion")) {
      // console.log("CCCCCCCCCCCCCC");
      x.classList.toggle("post_validation--none");
    }
  });
}

/*******************************************************/
// esconde elementos del dom, post validation usuario
function postValidationDisplayNone(obj) {
  Array.from(obj).forEach((x) => {
    x.classList.toggle("post_validation--none");
  });
}

/*******************************************************/
// transforma data en datapoints para grafico con label y:, x:
function toDataPoints(data) {
  const info = data.map((label) => {
    return { x: new Date(label.date), y: label.total };
  });
  return info;
}

/*******************************************************/

export { validation, init, postValidationDisplayNone, toDataPoints };
