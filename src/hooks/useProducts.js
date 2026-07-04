import { useState, useEffect } from 'react'

const BASE_URL = 'https://dummyjson.com/products'
export const PAGE_SIZE = 12

export function useProducts(searchQuery, page) {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    const skip = (page - 1) * PAGE_SIZE
    const url = searchQuery
      ? `${BASE_URL}/search?q=${searchQuery}&limit=${PAGE_SIZE}&skip=${skip}`
      : `${BASE_URL}?limit=${PAGE_SIZE}&skip=${skip}`

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products)
        setTotal(data.total)
      })
      .catch(() => setError('Erreur lors du chargement des produits'))
      .finally(() => setLoading(false))
  }, [searchQuery, page])

  return { products, total, loading, error }
}