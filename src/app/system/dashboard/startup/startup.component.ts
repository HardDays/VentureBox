import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserModel } from 'src/app/core/models/user.model';
import { DashboardService } from '../dashboard.service';
import { MoneyPipe } from '../../../core/pipes/money.pipe';
import { Label, MultiDataSet, Color, BaseChartDirective } from 'ng2-charts';
import { ChartOptions, Tooltip, ChartDataSets } from 'chart.js';
import { MilestonesModel } from 'src/app/core/models/milestones.model';
import { MilestonesService } from 'src/app/core/services/milestones.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-startup-dashboard-cmp',
  templateUrl: './startup.component.html'
})
export class StartupDashboardComponent implements OnInit {

    @Input() Me: UserModel;
    StartupEvaluationSelect = 'month';
    TotalEarn = 0;
    TotalInvestmen = 0;
    Score = 0;

    Milestones: MilestonesModel[] = [];

    public salesChartLabels: string[] = [];
    public displayLabels: Label[] = [];
    public salesChartData: MultiDataSet = [];
    public salesChartColors = [
      {
        backgroundColor: ['#AAC7FF', '#659AFF', '#0D60FF', '#0B2E71']
      }
    ];
    public salesChartOptions: ChartOptions = {
      responsive: true,
      legend: null,
      tooltips:{
        callbacks: {
          label: function(item, data)
          {
            return data.labels[item.index] + ' - ' + data.datasets[0].data[item.index] + '%';
          }
        }
      },
      plugins: {
        datalabels: {
          formatter: (value, ctx) => {
            const label = ctx.chart.data.labels[ctx.dataIndex];
            return label;
          },
        },
      }
    };

    @ViewChild(BaseChartDirective, { read: true }) evalChart: BaseChartDirective;
    public evalChartValue = 0;
    public evalChartData: ChartDataSets[] = [{ data: [], label: '' }];
    public evalChartLabels: Label[] = [];
    public evalChartOptions: any = {
      responsive: true,
      legend: null,
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
        }
      },
      tooltips:{
        callbacks: {
          label: function(item, data)
          {
            let string = item.value.toString();
            let reverse = string.split('').reverse()
            let str = '';
            let res_arr = [];

            for(const i in reverse)
            {
                str = reverse[i] + str;
                if(str.length == 3)
                {
                    res_arr.push(str);
                    str = '';
                }
            }

            if(str.length > 0)
            {
                res_arr.push(str);
            }

            return '$' + res_arr.reverse().join(' ');
          }
        }
      },
      scales:{
        yAxes:[
          {
            id: 'y-axis-0',
            position: 'left',
            ticks:{
              callback: function(value)
              {
                let res = '$';
                if(value >= 1000000000)
                {
                  res += value/1000000000 + ' B';
                }
                else if (value >= 1000000)
                {
                  res +=  value/1000000 + ' M';
                }
                else if (value >= 1000)
                {
                  res +=  value/1000 + ' K';
                }
                else
                {
                  res +=  value;
                }
                return res;
              },
              beginAtZero:true
            }
          }
        ]
      }
    };
    public evalColors: Color[] = [
      {
        backgroundColor: '#659AFF',
        borderColor: '#659AFF',
        pointBackgroundColor: 'rgba(0,0,0,0)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
    ];

    constructor(private _dashboardService: DashboardService,  private milestonesService: MilestonesService, private auth: AuthService)
    {

    }

    ngOnInit()
    {
      this.UpdateTotalEarn();
      this.UpdateTotalInvestment();
      this.UpdateSales();
      this.UpdateEvaluation();
      this.getMilestonesList();
    }

    UpdateTotalEarn()
    {
      this._dashboardService.GetTotalEarn((res) => {
        this.TotalEarn = res && res.total_earn ? res.total_earn : 0;
      });
    }

    UpdateTotalInvestment()
    {
      this._dashboardService.GetTotalInvestment(
        (res) => {
          this.TotalInvestmen = res && res.total_investment ? res.total_investment : 0;
        }
      );
    }

    UpdateScore()
    {
      this._dashboardService.GetScore(
        (res) => {
          this.Score = res && res.score ? res.score : 0;
        }
      );
    }

    UpdateSales()
    {
      this.salesChartLabels = [];
      this.displayLabels = [];
      this._dashboardService.GetSales(
        res => {
          let arr = [];
          let other_percent = 100;
          if(res && res.sales)
          {
            for(const i in res.sales)
            {
              const percent = Number.parseInt(res.sales[i].percent);
              // this.salesChartLabels.push(res.sales[i].name + ' - ' +  + '%');

              this.salesChartLabels.push(res.sales[i].name + ' - <span>' + percent + '%</span>');
              this.displayLabels.push(res.sales[i].name);
              arr.push(percent);
              other_percent -= percent;
            }
          }
          this.salesChartLabels.push('Other - <span>' + other_percent + '%</span>');
          this.displayLabels.push('Other');
          arr.push(other_percent);

          this.salesChartData = [arr];
        }
      );
    }

    OnStartupEvaluationSelectUpdate($event)
    {
      this.StartupEvaluationSelect = $event;
      this.UpdateEvaluation();

    }

    UpdateEvaluation()
    {
      this._dashboardService.GetEvaluation(this.StartupEvaluationSelect,(res) => {
        this.evalChartData.length = 0;
        this.evalChartLabels = [];
        let arr = [];
        if(res && res.evaluatons)
        {
          for(const i in res.evaluatons)
          {
            arr.push({x: res.evaluatons[i].date, y: res.evaluatons[i].value});
            this.evalChartLabels.push(res.evaluatons[i].date);
          }
        }

        this.evalChartValue = arr[arr.length - 1].y;

        this.evalChartData = [
          {data: arr}
        ];
      });
    }

    getMilestonesList () {
      this.milestonesService.GetMilestons( this.auth.Me.id,  this.auth.Me.company_id)
        .subscribe(
          (res) => {
            this.Milestones = res.json()['items'];
          }
        );
    }


}
