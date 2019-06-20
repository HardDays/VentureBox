import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { UserModel } from 'src/app/core/models/user.model';
import { DashboardService } from '../dashboard.service';
import { MoneyPipe } from '../../../core/pipes/money.pipe';
import { Color, Label, BaseChartDirective } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartData } from 'chart.js';
import { NewsModel } from 'src/app/core/models/news.model';


@Component({
  selector: 'app-investor-dashboard-cmp',
  templateUrl: './investor.component.html'
})
export class InvestorDashboardComponent implements OnInit {

    @Input() Me: UserModel;
    CompaniesGraphics = [];
    CompaniesNews = [];

    CompaniesGraphicId = '';

    _this = this;

    InvestmentAmount = 0;

    public ChartColors: Color[] = [
      {
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: 'rgba(149, 185, 255, 1)',
        pointBackgroundColor: 'rgba(0,0,0,0)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
    ];

    TotalValueSelector = 'month';
    @ViewChild(BaseChartDirective, { read: true }) totalChart: BaseChartDirective;
    public totalChartData: ChartDataSets[] = [{ data: [], label: '' }];
    public totalChartLabels: Label[] = [];
    public totalChartValue = 0;

    public totalChartOptions: any = {
      responsive: true,
      legend: null,
      elements:{
        point:{
          radius:0
        },
        line: {
          tension: 0.25
        }
      },
      tooltips: {
        titleFontSize: 16,
        bodyFontSize: 14,
        displayColors:false,
        titleMarginBottom: 9,
        titleSpacing: 6,
        bodySpacing: 6,
        xPadding: 15,
        yPadding: 15,
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

    RateValueSelector = 'month';
    @ViewChild(BaseChartDirective, { read: true }) rateChart: BaseChartDirective;
    public rateChartData: ChartDataSets[] = [{ data: [], label: '' }];
    public rateChartLabels: Label[] = [];
    public rateChartValue = 0;
    public CompaniesNewsId = '';
    public rateChartOptions: any  = {
      responsive: true,
      legend: null,
      elements:{
        point:{
          radius:1
        },
        line: {
          tension: 0.25
        }
      },
      
      tooltips: {
        titleFontSize: 16,
        bodyFontSize: 14,
        displayColors:false,
        titleMarginBottom: 9,
        titleSpacing: 6,
        bodySpacing: 6,
        xPadding: 15,
        yPadding: 15,
        callbacks: {
          label: function(item, data)
          {
            return item.value + '%';
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
                return value + '%';
              },
              beginAtZero: true,
              maxTicksLimit: 5,
              padding: 20
              
            }
          }
        ]
      }
    };

    public News: NewsModel[] = [];
    public NewsTotal: number = 0;
    

    constructor(private _dashboardService: DashboardService) 
    {
        this._dashboardService.InvestedCompaniesDicsUpdated.subscribe((val) => {
          this.UpdateCompaniesDics();
        });

        this._dashboardService.NewsUpdated.subscribe((val) => {
          if(val)
          {
            this.News = this._dashboardService.News;
            this.NewsTotal = this._dashboardService.NewsTotal;
          }
        });
        this._dashboardService.BaseInit();
    }

    ngOnInit() 
    {
        this.UpdateCompaniesDics();
    }

    UpdateCompaniesDics()
    {
      this.CompaniesGraphics =  JSON.parse(JSON.stringify(this._dashboardService.InvestedCompaniesDics));
      this.CompaniesNews =  JSON.parse(JSON.stringify(this._dashboardService.InvestedCompaniesDics));
    }

    OnCompaniesGraphicSelectChange(obj)
    {
      this.CompaniesGraphicId = obj.value;
      this.GetInvestedAmount();
      this.GetTotalChartData();
      this.GetRateChartData();
    }

    OnTotalValueSelectorUpdate(value)
    {
      if(this.TotalValueSelector != value)
      {
        this.TotalValueSelector = value;

        this.GetTotalChartData();
      }
    }

    GetInvestedAmount()
    {
      this._dashboardService.GetInvestmentAmount(this.CompaniesGraphicId,
        (res) => {
          this.InvestmentAmount = res && res.amount_invested ? res.amount_invested : 0;
        });
    }
    

    GetTotalChartData()
    {
      this._dashboardService.GetTotalChartData(this.TotalValueSelector, this.CompaniesGraphicId,
        (res) => {
          this.totalChartData.length = 0;
          this.totalChartLabels = [];
          let arr = [];
          if(res && res.total_current_values)
          {
            for(const i in res.total_current_values)
            {
              arr.push({x: i, y: res.total_current_values[i]});
              this.totalChartLabels.push(i);
            }
          }
          // const LastLabel = this.totalChartLabels[this.totalChartLabels.length - 1];

          // const lastIndex = arr.findIndex((obj) => obj.x == LastLabel);

          // this.totalChartValue = lastIndex > -1 ? arr[lastIndex].y : 0;

          // console.log(lastIndex, LastLabel, this.totalChartValue, arr[lastIndex]);

          this.totalChartValue = arr[arr.length - 1].y;

          this.totalChartData = [
            {data: arr}
          ];
        });
    }

    OnRateValueSelectorUpdate(value)
    {
      if(this.RateValueSelector != value)
      {
        this.RateValueSelector = value;

        this.GetRateChartData();
      }
    }

    GetRateChartData()
    {
      this._dashboardService.GetRateOfReturnChartData(this.RateValueSelector, this.CompaniesGraphicId,
        (res) => {
          this.rateChartData.length = 0;
          this.rateChartLabels = [];
          let arr = [];
          if(res && res.rate_of_return)
          {
            for(const i in res.rate_of_return)
            {
              arr.push({x: i, y: res.rate_of_return[i]});
              this.rateChartLabels.push(i);
            }
          }

          this.rateChartValue = arr[arr.length - 1].y;

          this.rateChartData = [
            {data: arr}
          ];
        });
    }

    OnCompaniesNewsSelectChange(obj)
    {
      this.CompaniesNewsId = obj.value;
      this.LoadNews({
        'new': true,
        'company_id': this.CompaniesNewsId,
        'limit': 2,
        'offset': 0
      });
    }

    LoadNews(Params)
    {
      this._dashboardService.RefreshNewsList(Params);
    }

    LoadMoreNews()
    {
      this.LoadNews({
        'company_id': this.CompaniesNewsId,
        'limit': 3,
        'offset': this.News.length
      });
    }
    
    
    
}
