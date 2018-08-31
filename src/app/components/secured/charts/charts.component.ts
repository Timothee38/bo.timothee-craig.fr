import { Component, OnInit, OnDestroy } from '@angular/core';

import { LogsCountObject, Frontpage } from "../../../models/index";

import { DataService, AlertService } from "../../../services/index";

import { Constants } from "../../../constants/app.constants";

@Component({
  selector: 'charts-component',
  templateUrl: '../../../templates/secured/charts/charts.component.html',
})
export class ChartsComponent implements OnInit, OnDestroy {

  model: Frontpage = new Frontpage();

  public lineChartData:Array<any> = [
    {data: null, label: "Website visit count"}
  ];
  public lineChartLabels:Array<any> = [];
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

  constructor(private dataService: DataService, private constants: Constants, private alertService: AlertService) {}

  ngOnInit(): void {
      this.loadChart();
      this.loadFrontpage();
  }

  ngOnDestroy(): void {

  }

  loadChart(): void {
    this.dataService.getAllBy<LogsCountObject>(this.constants.apiURL + "/logs", "1").subscribe(res => { this.handleChartsData(res, 1); }, err => {this.alertService.error("Error loading charts.");})
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

  loadFrontpage(): void {
    this.dataService.getOne<Frontpage>(this.constants.apiURL + "/frontpage").subscribe(res => {
      this.model = res;
    }, err => {console.log(err);});
  }

  updateFrontpage(): void {
    console.log(this.model);
    this.dataService.update<Frontpage>(this.constants.apiURL + "/frontpage", this.model.bigTitle, this.model)
      .subscribe(res => { this.model = res; this.alertService.success("Update Successful."); }, err => { this.alertService.error("Error updating frontpage"); });
  }

}
