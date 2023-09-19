'use client'
import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from '@/components'
import { fuels, yearsOfProduction } from '@/constants'
import { fetchCars } from '@/utils'
import { setFips } from 'crypto'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Home () {
  const [allCars, setAllCars] = useState([])
  const [loading, setLoading] = useState(true)
  // search states
  const [manufacturer, setManufacturer] = useState('')
  const [model, setModel] = useState('')
  // filter states
  const [fuel, setFuel] = useState('')
  const [year, setYear] = useState(2022)
  // pagination states
  const [limit, setLimit] = useState(10)

  const getCars = async () => {
    try {
      const result = await fetchCars({
        manufacturer: manufacturer || '',
        year: year || 2022,
        fuel: fuel || '',
        limit: limit || 10,
        model: model || ''
      })
      setAllCars(result)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  // getCars()

  useEffect(() => {
    getCars()
  }, [allCars, loading, manufacturer, model, fuel, year, limit])

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars

  return (
    <main className='overflow-hidden'>
      <Hero />
      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-6xl font-bold'>Car Catalogue</h1>
          <p className='text-gray-900 text-3xl'>
            Explore the cars you might like
          </p>
        </div>

        <div className='home__filters'>
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />
          <div className='home__filter-container'>
            <CustomFilter setFilter={setFuel} options={fuels} />
            <CustomFilter setFilter={setYear} options={yearsOfProduction} />
          </div>
        </div>

        {allCars.length > 0 ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars?.map(car => (
                <CarCard car={car} />
              ))}
            </div>
            {loading && (
              <div className='mt-16 w-full flex-center'>
                <Image
                  src='/loader.svg'
                  alt='loading'
                  width={50}
                  height={50}
                  className='object-contain'
                />
              </div>
            )}
            <ShowMore
              pageNumber={(limit || 10) / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ) : (
          !loading && (
            <div className='home__error-container'>
              <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
            </div>
          )
        )}
      </div>
    </main>
  )
}
