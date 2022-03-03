export interface ICard{
  id: number
  cardName: string
  multiverseId?: number
  layout?: string
  manaCost?: string
  CMC?: number
  cardText?: string
  cardType?: string
  rarity?:string,
  flavorText?: string
  artist?: string
  power?: string
  toughness?: string
  loyalty?: number
  setName?: string
  setLogo?: string
}

export interface ISet{
  id: number
  setName: string
  code: string
  setType: string
  releasedDate: string
  blockName?: string
  symbol?: string
}
