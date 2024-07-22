import React, { Component } from "react";
import CanvasJSReact from '@canvasjs/react-stockcharts';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oxNitroso: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/data")
      .then(res => res.json())
      .then((data) => {
        this.setState({
          isLoaded: true,
          oxNitroso: data.oxNitroso // Solo actualiza oxNitroso
        });
      });
  }

  render() {
    const options = {
      title: {
        text: "Ox Nitroso Measurements"
      },
      theme: "light2",
      subtitles: [{
        text: "Ox Nitroso Data"
      }],
      charts: [{
        axisX: {
          title: "Tiempo",
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
            name: "Ox Nitroso",
            showInLegend: true,
            color: "#3576a8",
            dataPoints: this.state.oxNitroso,
            valueFormatString: "MMM DD YYYY"
            
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
