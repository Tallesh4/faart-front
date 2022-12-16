

export interface GoalSuggestionsInterface {
  name: string,
  type: string,
  _id?: string,
  id?: string
}


export interface MonthValuesInterface {
  title: string,
  value: number
}

export interface OrderItemInterface {
  value: number,
  soldAmount: number
}

export interface MonthOrdersInterface {
  totalValue: number,
  totalSoldAmount: number,
  total: number,
  orders: MonthValuesInterface[]
}

export interface GoalsInterface {
  _id?: string,
  id?: string,
  advancedGoal?: {
    inBilling: {
      suggest: number,
      goal: number,
    },
    inVolume: {
      suggest: number,
      goal: number
    },
    inTotal: {
      suggest: number,
      goal: number
    }
  },
  clientId?: string,
  suggestTypeId: string,
  goalSuggestion?: GoalSuggestionsInterface,
  suggestName?: string,
  suggestValue?: number,
  seasonality: number,
  type?: "global" | "by_client" | "by_product"
  goal: number
}

export interface GoalSettingsInterface {
  goals: GoalsInterface,
  orders: {
    month1: MonthOrdersInterface,
    month2: MonthOrdersInterface,
    month3: MonthOrdersInterface
  }
}