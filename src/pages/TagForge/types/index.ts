export interface ILicensePlate {
  backgroundImgId: number
  backgroundCountry: string
  tagText: string
  fontStyleId: number
  color: {
    textColor: string
    borderColor: string
  }
}

export interface IPlateRequest {
  tag_text: string
  font_style: string
  text_color: string
  border_color: string
  img: Blob
}

export interface IForgeStep {
  id: number
  name: string
  status: boolean
  btnText: string
}

export interface IMintRule {
  minCharacters: number
  maxCharacters: number
  allowedCharacters: string
  backgrounds: string[]
}
