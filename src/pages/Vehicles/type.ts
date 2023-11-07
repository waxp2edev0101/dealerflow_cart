export interface BuildPaymentParam {
  loanTermMin: number
  loanTermMax: number
  downpayment: number
  listPrice: number
  vehicleVin: string
  vehicleMake: string
  vehicleModel: string
  vehicleTrim: string
  monthlyPayment: number
  income: number
  postCode: string
  creditScore: number
  tradeinValue: number
  country: string
}

export interface EstimatedPayment {
  TotalCostofOwnership: number
  MonthlyPayment: number
  Term: number
  InterestRate: number
  CostofInterest: number
}
