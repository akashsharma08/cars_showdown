'use client'

import { useState } from 'react'
import React from 'react'
import { SearchManufacturer } from '.'
import Image from 'next/image'
import { OtherClasses, SearchBarProps } from '@/types'
import { useRouter } from 'next/navigation'

const SearchButton = ({ OtherClasses }: OtherClasses) => (
  <button type='submit' className={`-ml-3 z-10 ${OtherClasses}`}>
    <Image
      src='/magnifying-glass.svg'
      alt='magnifying glass '
      width={40}
      height={40}
      className='object-contain'
    />
  </button>
)

const SearchBar = ({setManufacturer, setModel}: SearchBarProps) => {
  const [searchManufacturer, setSearchManufacturer] = useState('')
  const [searchModel, setSearchModel] = useState('')

  const router = useRouter()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (searchManufacturer.trim() === '' && searchModel.trim() === '') {
      return alert('Please provide some input')
    }

    setModel(searchModel)
    setManufacturer(searchManufacturer)
  }

  return (
    <form action='' className='searchbar' onSubmit={handleSearch}>
      <div className='searchbar__item'>
        <SearchManufacturer
          selected={searchManufacturer}
          setSelected={setSearchManufacturer}
        />
        <SearchButton OtherClasses='sm:hidden' />
      </div>

      <div className='searchbar__item'>
        <Image
          src='/model-icon.png'
          width={25}
          height={25}
          className='absolute w-[20px]  h-[20px] ml-4'
          alt='car model'
        />

        <input
          type='text'
          name='model'
          value={searchModel}
          onChange={e => setSearchModel(e.target.value)}
          placeholder='Tiguan'
          className='searchbar__input'
        />

        <SearchButton OtherClasses='sm:hidden' />
      </div>
      <SearchButton OtherClasses='max-sm:hidden' />
    </form>
  )
}

export default SearchBar
