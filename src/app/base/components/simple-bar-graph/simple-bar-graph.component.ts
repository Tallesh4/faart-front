import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { DefaultColors, RandomColor } from 'src/utils/colors';


@Component({
  selector: 'simple-bar-graph',
  templateUrl: './simple-bar-graph.component.html',
  styleUrls: ['./simple-bar-graph.component.scss']
})
export class SimpleBarGraphComponent implements OnInit {

  constructor() { }
  
  @Input() labels: string[] = [];
  @Input() datasets: any[] = [];
  @Input() backgroundColor?: string = "";
  @Input() label: string = "";
  @Input() type: string = "";
  @Input() title?: string = "";

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [ DataLabelsPlugin ];
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  ngOnInit(): void {  
    this.setOptionsChart(this.type);
    this.barChartData.labels = this.labels;
    const backgroundColorData = this.setColors();

    console.log("labels",this.labels)
    console.log("datasets",this.datasets)

    this.barChartData.datasets = [{ 
        data: this.datasets,
        label: this.label,
        backgroundColor: backgroundColorData,
        hoverBackgroundColor: backgroundColorData,
        maxBarThickness: 50,
        minBarLength: 100
      } 
    ];    
  }

  setColors(){
    const backgroundColorData: string[] = [];

    if(this.backgroundColor){
      backgroundColorData.push(this.backgroundColor);
    }

    if(!this.backgroundColor){
      const colorDefault = DefaultColors();

      this.datasets.forEach((item, index) => {
        const color = colorDefault[index];
        backgroundColorData.push(color);
      })
    }

    return backgroundColorData;
  }

  setOptionsChart(type: string){
    switch(type){
      case "chart-bar-horizontal":
        this.barChartOptions = {
          responsive: true,
          scales: {
            x: {
              grid: {
                display: false
              }
            },
            y: {
              min: 10,
              grid: {
                display: false
              }
            }
          },
          plugins: {
            legend: {
              display: false,
              labels: {
                font: {
                  size: 30
                }
              },
            },
            datalabels: {
              color: "#fff",
              font: {
                size: 20,
                weight: 'bold'
              }
            }
          }
        }
        break;
      
      case "chart-bar-vertical-currency": {
        this.barChartOptions = {
          responsive: true,
          indexAxis: 'y',
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              grid: {
                display: false
              },
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  return context.parsed.x.toLocaleString('pt-br', { style: "currency", currency: "BRL" });;
                }
              }
            },
            datalabels: {
              color: "#fff",
              formatter: (value: number, context) => {
                return value.toLocaleString("pt-br", { style: "currency", currency: "BRL" })
              },
              font: {
                size: 18,
                weight: 'bold'
              },
            }
          }
        }
        break;
      }

      case "chart-bar-vertical": {
        this.barChartOptions = {
          responsive: true,
          indexAxis: 'y',
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              grid: {
                display: false
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            datalabels: {
              color: "#fff",
              font: {
                size: 18,
                weight: 'bold'
              },
            }
          }
        }
        break;
      }

      case "pie": {
        this.barChartType = "pie";
        this.barChartOptions = {
          responsive: true,
          plugins: {
            datalabels: {
              display: false
            },
            legend: {
              position: "right"
            },
            title: {
              display: true,
              text: this.title,
              align: "start",
              font: {
                size: 22,
              }
            }
          }
        }
        break
      }
      default:
        break;
    }
  }
}
