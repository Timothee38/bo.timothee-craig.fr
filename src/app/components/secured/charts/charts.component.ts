import { Component, OnInit, OnDestroy } from '@angular/core';

import { LogsCountObject } from "../../../models/index";

import { DataService } from "../../../services/index";

import { Constants } from "../../../constants/app.constants";

@Component({
  selector: 'charts-component',
  templateUrl: '../../../templates/secured/charts/charts.component.html',
})
export class ChartsComponent implements OnInit, OnDestroy {

  public lineChartData:Array<any> = [
    {data: null, label: "Website visit count"})
  ];
  public lineChartLabels:Array<any> = []; // TODO fill in
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  constructor(private dataService: DataService, private constants: Constants) {}

  ngOnInit(): void {
      this.loadChart();
  }

  ngOnDestroy(): void {

  }

  loadChart(): void {
    this.dataService.getAllBy<LogsCountObject>(this.constants.apiURL + "/logs", "1").subscribe(res => { this.handleChartsData(res, 1); }, err => {console.log(err);})
    // TODO later, implement other types of logs (unused for now)
  }

  handleChartsData(res: LogsCountObject[], logtype: number): void {
    if(Array.isArray(res) && res.length) {
      var data = [];
      var labels = [];
      res.forEach(function(logsCountObject) {
        data.push(logsCountObject.count);
        labels.push(logsCountObject.date);
      });
      this.lineChartData[0] = {data: data, label: "Website visit count"};
      this.lineChartLabels = labels;
    }
  }

}
