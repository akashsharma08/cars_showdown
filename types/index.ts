import { MouseEventHandler } from 'react'

export interface CustomButtonProps {
  title: string
  containerStyles?: string
  handleClick?: MouseEventHandler<HTMLButtonElement>
  btnType?: 'button' | 'submit'
  textStyles?: string
  rightIcon?: string
  isDisables?: boolean
}
export interface SearchManufacturerProps {
  manufacturer: String
  setManufacturer: (manufacturer: string) => void
}
export interface OtherClasses {
  OtherClasses: String;
}
export interface carProps {
  city_mpg: number
  class: string
  combination_mpg: number
  cylinders: number
  displacement: number
  drive: string
  fuel_type: string
  highway_mpg: number
  make: string
  model: string
  transmission: string
  year: number
}


export interface FilterProps {
  manufacturer?: string;
  year?: number;
  model?: string;
  limit?: number;
  fuel?: string;
}

export interface OptionProps{
	title: string;
	value:string;
}

export interface CustonFilterProps {
  title: string;
	options: OptionProps[]
}

export interface ShowMoreProps {
  pageNumber: number;
	isNext: boolean;
}