

export interface HomeDailyInterface{
    activeUsers: number,
    totalUsers: number,
    productivityByPercentage: string,
    orderBilling: number,
    orderNumber: number,
    visitsMade: number,
    expectedVisits: number,
    offRouteVisit: number,
    userActiveWithTotalUsers: string,
    realizedExpectedVisits: string,
    orderBillingText: string
}
export interface HomeMouthIndicators{
    visitMade: number,
    offRouteVisit: number,
    percentageVisited: string,
    displacement: string,
    timeOfPDV: string,
    expectedVisits: number,
    journey: string,
    realizedExpectedVisits: string,
    orderBilling: number,
    orderBillingText: string,
    orderNumber: number,
}

export interface HomeMapInterface{
    avatar: string,
    name: string,
    userLat: number,
    userLng: number,
    visits: HomeMapVisitsInterface[]
}

export interface HomeOutletMapInterface {
    name: string,
    user: string,
    icon: string,
    lat: number,
    long: number, 
    reviewVisit: string,
    visible: boolean,
    userAvatar: string,
    ref: string,
}

export interface HomeUserListMap{
    name: string, 
    ref: string,
    visible: boolean,
    info_window: boolean,
    lat: number, 
    lng: number,
    icon: string
}

interface HomeMapVisitsInterface{
    clientName: string,
    clientLat: number,
    clientLng: number,
}

export interface HomeProductivityGraph{
    name: string,
    numberOfVisit: number,
    visitMade: number,
    visitsMadeInPercentage: number
}

export interface HomeBestSellingProductChart{
    productId: string,
    name: string,
    value: number
}

export interface HomeMapClientInterface{
    clientName: string,
    clientLat: number,
    clientLng: number,
}

export interface HomePaymentConditionChart {
    name: string,
    value: number
}

export interface HomePaymentMethodChart{
    name: string,
    value: number
}

export interface HomeSaleTypeChart{
    name: string,
    value: number
}

export interface HomeClientChart{
    clientName: string,
    value: number
}

export interface HomeSellerChart{
    seller: string,
    value: number
}

export interface HomeQueryDefault { 
    year: number, 
    month: number, 
    billing: undefined | boolean 
}