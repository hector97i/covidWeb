		const US_h = [{
		        nombre: "California", //Estado y habitantes totales
		        hab: 39512223
		    },
		    {
		        nombre: "Texas",
		        hab: 2899881
		    },
		    {
		        nombre: "Florida",
		        hab: 21477737
		    },
		    {
		        nombre: "New York",
		        hab: 19453561
		    },
		    {
		        nombre: "Pennsylvania",
		        hab: 12801989
		    },
		    {
		        nombre: "Illinois",
		        hab: 12671821
		    },
		    {
		        nombre: "Ohio",
		        hab: 11689100
		    },
		    {
		        nombre: "Georgia",
		        hab: 10617423
		    },
		    {
		        nombre: "North Carolina",
		        hab: 10488084
		    },
		    {
		        nombre: "Michigan",
		        hab: 9986857
		    },
		    {
		        nombre: "New Jersey",
		        hab: 8882190
		    },
		    {
		        nombre: "Virginia",
		        hab: 8535519
		    },
		    {
		        nombre: "Washington",
		        hab: 7614893
		    },
		    {
		        nombre: "Arizona",
		        hab: 7278717
		    },
		    {
		        nombre: "Massachusetts",
		        hab: 6949503
		    },
		    {
		        nombre: "Tennesse",
		        hab: 6833174
		    },
		    {
		        nombre: "Indiana",
		        hab: 6732219
		    },
		    {
		        nombre: "Missouri",
		        hab: 6137428
		    },
		    {
		        nombre: "Maryland",
		        hab: 6045680
		    },
		    {
		        nombre: "Wisconsin",
		        hab: 5882434
		    },
		    {
		        nombre: "Colorado",
		        hab: 5758736
		    },
		    {
		        nombre: "Minnesota",
		        hab: 5639632
		    },
		    {
		        nombre: "South Carolina",
		        hab: 5148714
		    },
		    {
		        nombre: "Alabama",
		        hab: 4903185
		    },
		    {
		        nombre: "Lousiana",
		        hab: 4648794
		    },
		    {
		        nombre: "Kentucky",
		        hab: 4467673
		    },
		    {
		        nombre: "Oregon",
		        hab: 4212737
		    },
		    {
		        nombre: "Oklahoma",
		        hab: 3956971
		    },
		    {
		        nombre: "Connecticut",
		        hab: 3565287
		    },
		    {
		        nombre: "Utah",
		        hab: 3205958
		    },
		    {
		        nombre: "Puerto Rico",
		        hab: 3193694
		    },
		    {
		        nombre: "Iowa",
		        hab: 3155070
		    },
		    {
		        nombre: "Nevada",
		        hab: 3080156
		    },
		    {
		        nombre: "Arkansas",
		        hab: 3017825
		    },
		    {
		        nombre: "Mississippi",
		        hab: 2976149
		    },
		    {
		        nombre: "Kansas",
		        hab: 2193314
		    },
		    {
		        nombre: "New Mexico",
		        hab: 2096829
		    },
		    {
		        nombre: "Nebraska",
		        hab: 1934408
		    },
		    {
		        nombre: "Idaho",
		        hab: 1787065
		    },
		    {
		        nombre: "West Virginia",
		        hab: 1792147
		    },
		    {
		        nombre: "Hawaii",
		        hab: 1415872
		    },
		    {
		        nombre: "New Hampshire",
		        hab: 1359711
		    },
		    {
		        nombre: "Maine",
		        hab: 1344212
		    },
		    {
		        nombre: "Montana",
		        hab: 1068778
		    },
		    {
		        nombre: "Rhode Island",
		        hab: 1059361
		    },
		    {
		        nombre: "Delaware",
		        hab: 973764
		    },
		    {
		        nombre: "South Dakota",
		        hab: 884659
		    },
		    {
		        nombre: "North Dakota",
		        hab: 768062
		    },
		    {
		        nombre: "Alaska",
		        hab: 731545
		    },
		    {
		        nombre: "District of Columbia",
		        hab: 705749
		    },
		    {
		        nombre: "Vermont",
		        hab: 623989
		    },
		    {
		        nombre: "Wyoming",
		        hab: 578759
		    }
		];

		var stateP = []; //Variables globales
		var stateD = "Wyoming";
		var dataPP = [];
		var dataPD = [];
		var configPie = { //Varible de configuracion para la grafica de pastel
		    type: 'pie',

		    data: {
		        datasets: [{
		            label: 'Habitantes afectados',
		            data: dataPP,
		            backgroundColor: '#36a2eb'
		        }],
		        labels: stateP,
		        backgroundColor: 'red'
		    },
		    options: {
		        legend: {
		            display: false
		        },
		        title: {
		            display: true,
		            text: 'Personas afectadas por estado'
		        }
		    }
		};

		async function getData() { //Trae la data desde us.csv, el archivo debe estar en la misma carpeta
		    const response = await fetch('us.csv');
		    const data = await response.text();

		    const xs = [];
		    const ys = [];

		    const date = [];
		    const dateP = [];
		    const cases = [];
		    const deaths = [];

		    var count = 0;
		    var acum = 0;
		    var start = false;

		    const table = data.split('\n').slice(1);
		    table.forEach(row => {
		        const colums = row.split(',');
		        const dateT = colums[0];
		        date.push(dateT);
		        const casesT = colums[1];
		        cases.push(casesT);
		        const deathsT = colums[2];
		        deaths.push(deathsT);
		    });

		    date.forEach(row => {
		        const dateS = row.split('-');
		        const dateD = dateS[1] + dateS[2];
		        dateP.push(dateD);
		    })

		    const points = [];
		    for (var i = 0; i <= cases.length - 1; i++) {
		        points.push({
		            x: date[i],
		            y: parseInt(cases[i])
		        });
		    }

		    return { points, date };
		}

		drawScaChart();
		drawDogChart();
		drawPieChart();

		async function drawScaChart() { //Dibuja la grafica de dipersion (no mover nada)
		    const dataP = await getData();
		    const ctx = document.getElementById('scaChart').getContext('2d');
		    const scatterChart = new Chart(ctx, {
		        type: 'scatter',

		        data: {
		            datasets: [{
		                label: 'Casos acumulados por dia',
		                data: dataP.points,
		                backgroundColor: 'red'
		            }]
		        },
		        options: {
		            title: {
		                display: true,
		                text: 'Evolucion de casos acumulados desde enero de 2020.'
		            },
		            scales: {
		                xAxes: [{
		                    labels: dataP.date,
		                    type: 'category',
		                    position: 'bottom'
		                }]
		            }
		        }
		    });
		}

		async function drawDogChart() { //Dibuja la grafica de dona, lanzar cada vez que se haga filtro
		    var acum = 0;
		    var tmpSta = 0;
		    for (var i = US_h.length - 1; i >= 0; i--) {
		        if (US_h[i].nombre == stateD) { //Para elegir estado, poner el nombre del
		            tmpSta = US_h[i].hab; //estado en la variable 'stateD' y lanzar
		        } //la funcion de nuevo.
		    }
		    for (var i = Object.entries(JSONdata).length - 1; i >= 0; i--) {
		        if (Object.entries(JSONdata)[i][1].state == stateD) {
		            acum = tmpSta - parseInt(Object.entries(JSONdata)[i][1].cases);
		            dataPD.push(acum);
		            dataPD.push(parseInt(Object.entries(JSONdata)[i][1].cases));
		        }
		    }
		    var ctx = document.getElementById('dogChart').getContext('2d');
		    window.myDoughnut = new Chart(ctx, {
		        type: 'doughnut',

		        data: {
		            datasets: [{
		                label: 'Habitantes afectados',
		                data: dataPD,
		                backgroundColor: ['blue', 'yellow']
		            }],
		            labels: ["Sanos", "Afectados"]
		        },
		        options: {
		            title: {
		                text: 'Personas afectadas en el estado de ' + stateD,
		                display: true,
		            }
		        }

		    });
		}

		function updateDogChart() {
		    var acum = 0;
		    var tmpSta = 0;
		    dataPD.pop();
		    dataPD.pop();
		    for (var i = US_h.length - 1; i >= 0; i--) {
		        if (US_h[i].nombre == stateD) { //Para elegir estado, poner el nombre del
		            tmpSta = US_h[i].hab; //estado en la variable 'stateD' y lanzar
		        } //la funcion de nuevo.
		    }
		    for (var i = Object.entries(JSONdata).length - 1; i >= 0; i--) {
		        if (Object.entries(JSONdata)[i][1].state == stateD) {
		            acum = tmpSta - parseInt(Object.entries(JSONdata)[i][1].cases);
		            dataPD.push(acum);
		            dataPD.push(parseInt(Object.entries(JSONdata)[i][1].cases));
		        }
		    }
		    window.myDoughnut.update();
		}


		async function drawPieChart() { //Dibuja la grafica de pastel (no mover nada)
		    for (var i = Object.entries(JSONdata).length - 1; i >= 0; i--) {
		        dataPP.push(parseInt(Object.entries(JSONdata)[i][1].cases));
		        stateP.push(Object.entries(JSONdata)[i][1].state);
		    }
		    var pie = document.getElementById('pieChart').getContext('2d');
		    window.myPie = new Chart(pie, configPie);

		}