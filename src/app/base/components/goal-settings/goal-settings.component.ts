import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { convertToCurrency } from 'src/utils/currency.utils';
import { number_format } from 'src/utils/Number';
import { GoalSettingsInterface, GoalsInterface, GoalSuggestionsInterface, MonthValuesInterface } from './goal-settings.interface';
import { GlobalGoalSettingsService } from './goal-settings.service';


@Component({
  selector: 'app-goal-settings',
  templateUrl: './goal-settings.component.html',
  styleUrls: ['./goal-settings.component.scss']
})
export class GoalSettingsComponent implements OnInit, AfterViewInit {

  @Output() onGoalChanged = new EventEmitter();
  @Input() route = "";
  goalSuggestions: GoalSuggestionsInterface[] = [];
  goalSettingsVisible: boolean = false;
  convertToBRL = (value: any) => convertToCurrency(value, { locale: "pt-BR", currency: "BRL" });
  constructor(
    private globalGoalSettingsService: GlobalGoalSettingsService
  ) { }

  monthValues: MonthValuesInterface[] = [
    {
      title: "Mês 1",
      value: 1440
    },
    {
      title: "Mês 2",
      value: 1550
    },
    {
      title: "Mês 3",
      value: 1320
    }
  ]

  @Input() defaultGoal: GoalSettingsInterface = {
    goals: {
      suggestTypeId: "",
      suggestName: "Média",
      goalSuggestion: {
        name: "",
        type: ""
      },
      advancedGoal: {
        inBilling: {
          goal: 0,
          suggest: 0
        },
        inVolume: {
          goal: 0,
          suggest: 0
        },
        inTotal: {
          goal: 0,
          suggest: 0
        }
      },
      suggestValue: 0,
      seasonality: 10,
      goal: 0
    },
    orders: {
      month1: {
        orders: [],
        totalSoldAmount: 0,
        totalValue: 0,
        total: 0
      },
      month2: {
        orders: [],
        totalSoldAmount: 0,
        totalValue: 0,
        total: 0
      },
      month3: {
        orders: [],
        totalSoldAmount: 0,
        totalValue: 0,
        total: 0
      }
    }
  }

  goalSetting: GoalsInterface = {
    suggestTypeId: "",
    suggestValue: undefined,
    seasonality: 10,
    goal: 0
  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.getGoalSuggestions();

    this.goalSetting.type = this.defaultGoal.goals.type;
    this.goalSetting.clientId = this.defaultGoal.goals.clientId;
    this.goalSetting.id = this.defaultGoal.goals.id;
    this.goalSetting._id = this.defaultGoal.goals._id;

    this.monthValues[0].value = this.defaultGoal.orders.month1.total;
    this.monthValues[1].value = this.defaultGoal.orders.month2.total;
    this.monthValues[2].value = this.defaultGoal.orders.month3.total;

    this.goalSetting.seasonality = <number>new Number(this.defaultGoal.goals.seasonality)
  }

  toggleGoalSettings = () => {
    this.goalSetting.suggestValue = undefined;
    this.goalSettingsVisible = !this.goalSettingsVisible;
  }

  getGoalSuggestions = async () => {
    this.globalGoalSettingsService.getGoalSuggestions().subscribe((response) => {
      this.goalSuggestions = response;
    })
  }

  getMonthValues = () => {
    let newMonthValues = JSON.parse(JSON.stringify(this.monthValues));

    // for (let item of newMonthValues) {
    //   item.value = convertToCurrency(item.value, { locale: 'pt-PT', currency: 'BRL' })//parseFloat(item.value).toFixed(2);
    //   item.value = String(item.value).replace(/ /g, ".");
    // }

    return newMonthValues;
  }

  getTotal = (): number => {

    let total = 0;
    for (let item of this.monthValues) {
      total += item.value;
    }

    return total;

  }

  getValueByType = (valueType: string): number => {

    let newMonthValues: MonthValuesInterface[] = JSON.parse(JSON.stringify(this.monthValues));

    newMonthValues.sort((a, b) => {
      return b.value - a.value
    })

    let value = 0;

    switch (valueType) {
      case "higher":
        value = newMonthValues[0].value;
        break;
      case "lower":
        value = newMonthValues[newMonthValues.length - 1].value;
        break;
      case "average":
        value = this.getTotal() / 3;
        break;
    }

    return Number(parseFloat(String(value)).toFixed(2));

  }

  onSuggestTypeSelected = (event: any) => {

    let suggestion_id = event.target.value;

    this.goalSetting.suggestTypeId = suggestion_id;

    let suggestion = this.goalSuggestions.find(element => element.id == suggestion_id);

    if (suggestion) {
      this.goalSetting.suggestValue = this.getValueByType(suggestion?.type)
    } else {
      this.goalSetting.suggestValue = undefined;
    }



  }

  onSeasonality = (event: any) => {

    let value = event.target.value;

    this.goalSetting.seasonality = value;

    this.goalSetting.seasonality = Number(value);


  }

  updateMeta = () => {

    let goal = this.goalSetting.suggestValue ? this.goalSetting.suggestValue : 0;
    let average = this.goalSetting.seasonality && this.goalSetting.seasonality > 0 ? this.goalSetting.seasonality / 100 : 0;

    this.goalSetting.goal = goal + (
      this.goalSetting.seasonality && this.goalSetting.seasonality > 0
        ?

        goal * average
        :
        0
    )

    return goal;

  }

  getMeta = () => {
    this.updateMeta();
    return parseFloat(String(this.goalSetting.goal)).toFixed(2)
  }

  sendGoal = () => {
    this.globalGoalSettingsService.setRoute(this.route);


    this.globalGoalSettingsService.sendGoal(this.goalSetting).subscribe((response) => {
      this.defaultGoal.goals.goal = response.goal;
      this.defaultGoal.goals.suggestName = response.suggestName;
      this.defaultGoal.goals.seasonality = response.seasonality;
      this.onGoalChanged.emit();
    })
  }

}
