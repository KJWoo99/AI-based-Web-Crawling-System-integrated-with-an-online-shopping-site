  import React, { useEffect, useState } from 'react'
  import CheckBox from './Sections/CheckBox'
  import RadioButtons from './Sections/RadioButtons'
  import SearchInput from './Sections/SearchInput'
  import CardItem from './Sections/CardItem'
  import axiosInstance from '../../utils/axios';
  import { categories, prices } from '../../utils/category'

  const LandingPage = () => {

    const limit = 4;
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [filters, setFilters] = useState({
      categories: [],
      price: []
    })


    useEffect(() => {
      fetchProducts({ skip, limit });
    }, [])


    const fetchProducts = async ({ skip, limit, loadMore = false, filters = {}, searchTerm = "" }) => {
      const params = {
        skip,
        limit,
        filters,
        searchTerm
      }


      try {
        const response = await axiosInstance.get('/products', { params })

        if (loadMore) {
          setProducts([...products, ...response.data.products])
        } else {
          setProducts(response.data.products);
        }
        setHasMore(response.data.hasMore);
      } catch (error) {
        console.error(error);
      }
    }

    const handleLoadMore = () => {
      const body = {
        skip: skip + limit,
        limit,
        loadMore: true,
        filters,
        searchTerm
      }
      fetchProducts(body);
      setSkip(skip + limit)
    }

    const handleFilters = (newFilteredData, category) => {
      const newFilters = { ...filters };
      newFilters[category] = newFilteredData;
      if (category === 'price') {
        const priceValues = handlePrice(newFilteredData);
        newFilters[category] = priceValues
      }
      showFilteredResults(newFilters);
      setFilters(newFilters);
    }

    const handlePrice = (value) => {
      let array = [];

      for (let key in prices) {
        if (prices[key]._id === parseInt(value, 10)) {
          array = prices[key].array
        }
      }
      return array;
    }

    const showFilteredResults = (filters) => {
      console.log(filters);
      const body = {
        skip: 0,
        limit,
        filters,
        searchTerm
      }

      fetchProducts(body);
      setSkip(0);
    }

    const handleSearchTerm = (event) => {
      const body = {
        skip: 0,
        limit,
        filters,
        searchTerm: event.target.value
      }
      setSkip(0);
      setSearchTerm(event.target.value);
      fetchProducts(body);
    }


    return (
      <section className='bg-white'>
        <div className='text-center m-7 bg-white text-black'>
          <h2 className='text-2xl font-bold '>APPLE SALES</h2>
        </div>
        <div className='flex gap-3 '>
          <div className='w-1/2'>
            <CheckBox categories={categories} checkedCategories={filters.categories}
              onFilters={filters => handleFilters(filters, "categories")}
            />
          </div>
          <div className='w-1/2 '>
            <RadioButtons prices={prices} checkedPrice={filters.price}
              onFilters={filters => handleFilters(filters, "price")}
            />
          </div>
        </div>
        <div className='flex justify-end mb-3 '>
          <SearchInput searchTerm={searchTerm} onSearch={handleSearchTerm} />
        </div>
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-4 '>
          {products.map(product =>
            <CardItem product={product} key={product._id} />
          )}
        </div>
        {hasMore &&
          <div className='flex justify-center mt-5'>
            <button
              onClick={handleLoadMore}
              style={{
                borderRadius: '5px',
                backgroundColor: 'black',
                color: 'white',
                border: 'none',
                padding: '5px',
                fontSize: '18px',
                width: '10%',
              }}
              >
              More
            </button>
          </div>
        }
      </section>
    )
  }

  export default LandingPage