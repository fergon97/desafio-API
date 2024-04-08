let myChart;

const obtenerInformacion = async () => {
  try {
    const resultado = document.querySelector("#resultado");
    const monedaCLP = document.querySelector("#monedaCLP").value;
    const elSelect = document.querySelector("#elSelect");
    const url = elSelect.value;

    const res = await fetch(`https://mindicador.cl/api/${url}`);
    const data = await res.json();

    let series = data.serie.slice(0, 9);
    let fecha = series.map((seriess) => {
      return new Date(seriess.fecha).toLocaleDateString("en-GB");
    });
    const x = fecha.reverse();

    let valores = series.map((item) => item.valor);
    const y = valores.reverse();

    let eldato = data.serie[0];
    let moneda = eldato.valor;

    let CLP = Number(monedaCLP);
    if (isNaN(CLP) || CLP <= 0) {
      alert("Por favor, ingresa una cantidad válida.");
    } else {
      let totalMonedas = CLP / moneda;
      resultado.innerHTML = `$${totalMonedas.toFixed(2)}`;
    }

    lasXY(x, y);
  } catch (error) {
    console.log(error);
  }
};

function lasXY(x, y) {
  var ctx = document.getElementById("myChart").getContext("2d");
  if (myChart) {
    myChart.destroy();
  }
  myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: x,
      datasets: [
        {
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(0,0,255,1.0)",
          borderColor: "rgba(0,0,255,0.1)",
          data: y,
        },
      ],
    },
  });
}

document
  .querySelector("#btnObtener")
  .addEventListener("click", obtenerInformacion);
