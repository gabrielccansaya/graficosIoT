import React, { Component } from "react";
import CanvasJSReact from '@canvasjs/react-stockcharts';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      porcOxNitroso: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/dat")
      .then(res => res.json())
      .then((data) => {
        const porcOxNitroso = data.porcOxNitroso.map(item => ({
          x: new Date(item.date), // Asegúrate de que `item.date` esté en milisegundos
          y: [item.porcOxNitroso] // Asegúrate de que `item.low`, `item.open`, `item.high`, `item.close` sean los valores correctos
        }));
  
        this.setState({
          isLoaded: true,
          porcOxNitroso // Solo actualiza porcOxNitroso
        });
      });
  }
  render() {
    const options = {
      title: {
        text: "Porc Ox Nitroso Measurements"
      },
      theme: "light2",
      subtitles: [{
        text: "Porc Ox Nitroso Data"
      }],
      charts: [{
        axisX: {
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            valueFormatString: "MMM DD YYYY"
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
            name: "Porc Ox Nitroso",
            showInLegend: true,
            dataPoints: this.state.porcOxNitroso
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
