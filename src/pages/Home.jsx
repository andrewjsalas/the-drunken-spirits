import { useState, useEffect } from "react"
import CocktailList from "../components/CocktailList"
import SearchBar from '../components/SearchBar'
import styled from "styled-components"

function Home() {
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [cocktails, setCocktails,] = useState([])

  // Grab drink data from API
  useEffect(() => {
    setLoading(true)
    async function getDrinks() {
      // Fetch data from the API using the search term
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
        )
        const data = await response.json()
        const { drinks } = data
        if (drinks) {
          // Map the retrieved drinks data to a new format
          const newCocktails = drinks.map((item) => {
            const {
              idDrink, 
              strDrink, 
              strDrinkThumb,
              strAlcoholic,
              strGlass,
            } = item
            return {
              id: idDrink, 
              name: strDrink,
              image: strDrinkThumb,
              info: strAlcoholic,
              glass: strGlass,
            }
          })
          setCocktails(newCocktails)
        } else {
          setCocktails([])
        }
      } catch (error) {
        console.log(error)
      }
      // Set loading to false after fetching data
      setLoading(false)
    }
    // Invoke the function to fetch drinks data when searchTerm changes
    getDrinks()
  }, [searchTerm])

  return (
    <HomePage>
      <SearchBar setSearchTerm={setSearchTerm} />
      <CocktailList loading={loading} cocktails={cocktails} />
    </HomePage>
  )
}

const HomePage = styled.main`
background: #1A1F23;
`

export default Home