import React, { Component } from "react";
import CanvasJSReact from '@canvasjs/react-stockcharts';
//var CanvasJSReact = require('@canvasjs/react-stockcharts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oxNitroso: [],
      porcOxNitroso: [],
      voltOxNitroso: [],
      metano: [],
      porcMetano: [],
      voltMetano: [],
      temperatura: [],
      humedad: [],
      presion: [],
      co2: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/data")
      .then(res => res.json())
      .then((data) => {
        this.setState({
          isLoaded: true,
          ...data
        });
      });
  }

  render() {
    const options = {
      title: {
        text: "Environmental Measurements Chart"
      },
      theme: "light2",
      subtitles: [{
        text: "Various Environmental Measurements"
      }],
      charts: [{
        axisX: {
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            valueFormatString: "MMM DD YYYY" // Asegúrate de que el formato sea correcto
          },
          labelFormatter: function (e) {
            return CanvasJS.formatDate(new Date(e.value), "MMM DD YYYY");
          }
        },
        axisY: {
          title: "Values",
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            valueFormatString: "#,###.##"
          }
        },
        toolTip: {
          shared: true
        },
        data: [
          {
            type: "line",
            name: "Ox Nitroso",
            showInLegend: true,
            dataPoints: this.state.oxNitroso
          },
          {
            type: "line",
            name: "Porc Ox Nitroso",
            showInLegend: true,
            dataPoints: this.state.porcOxNitroso
          },
          {
            type: "line",
            name: "Volt Ox Nitroso",
            showInLegend: true,
            dataPoints: this.state.voltOxNitroso
          },
          {
            type: "line",
            name: "Metano",
            showInLegend: true,
            dataPoints: this.state.metano
          },
          {
            type: "line",
            name: "Porc Metano",
            showInLegend: true,
            dataPoints: this.state.porcMetano
          },
          {
            type: "line",
            name: "Volt Metano",
            showInLegend: true,
            dataPoints: this.state.voltMetano
          },
          {
            type: "line",
            name: "Temperatura",
            showInLegend: true,
            dataPoints: this.state.temperatura
          },
          {
            type: "line",
            name: "Humedad",
            showInLegend: true,
            dataPoints: this.state.humedad
          },
          {
            type: "line",
            name: "Presion",
            showInLegend: true,
            dataPoints: this.state.presion
          },
          {
            type: "line",
            name: "CO2",
            showInLegend: true,
            dataPoints: this.state.co2
          }
        ]
      }],
      navigator: {
        slider: {
          minimum: new Date("2020-04-01"),
          maximum: new Date("2025-05-01")
        }
      }
    };

    const containerProps = {
      width: "100%",
      height: "450px",
      margin: "auto"
    };

    return (
      <div>
        <div>
          {this.state.isLoaded &&
            <CanvasJSStockChart containerProps={containerProps} options={options} />
          }
        </div>
      </div>
    );
  }
}

export default App;
