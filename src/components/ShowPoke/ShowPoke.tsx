/* eslint-disable @typescript-eslint/no-explicit-any */
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { Button, Checkbox } from '@mui/material'
import { Pokemon } from 'pokenode-ts'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import NoMatch from '../../page/NoMatch'
import './ShowPoke.scss'
import { pokeApi } from '../../api'
import { createBrowserHistory } from 'history'
import TableComponent from '../Table/Table'
import RingLoader from '../preloaders/RingLoader/RingLoader'

interface IShowPokeProps {
  pokemon?: Pokemon
}

const ShowPoke: React.FC<IShowPokeProps> = ({ pokemon }): JSX.Element => {
  const { id } = useParams<'id'>()
  const history = createBrowserHistory()

  const { addFavorite, removeFavorite } = useActions()
  const { favorites } = useTypedSelector((st) => st.poke)
  const [pokDetalis, setPokDetalis] = useState<Pokemon | undefined>(pokemon)
  const [pokeColor, setPokeColor] = useState<string>('transparent')

  const getPokemon = async () => {
    if (!pokemon) {
      if (!id) return
      const response = (await pokeApi.pokemon.getPokemonById(+id)) as Pokemon
      const urlSpecies = response.species.url
      const numPos = urlSpecies.lastIndexOf('/', urlSpecies.length - 2)
      const numStr = urlSpecies.slice(numPos + 1, -1)

      const responseSpecies = await pokeApi.pokemon.getPokemonSpeciesById(+numStr)
      const colorName = responseSpecies.color.name
      setPokDetalis(response)
      setPokeColor(colorName)
    }
  }

  useEffect(() => {
    getPokemon()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!id || !pokDetalis) {
    return <RingLoader />
  }

  const isFavorite = favorites.find((name) => name === pokDetalis.name)

  const handleCheckboxInput = () => {
    isFavorite ? removeFavorite(pokDetalis.name) : addFavorite(pokDetalis.name)
  }

  return (
    <div className={`show-poke-container ${pokeColor}`}>
      <div className="button-back-go">
        <Button variant="outlined" id="button-back" onClick={() => history.back()}>
          {'<' + ' BACK'}
        </Button>
      </div>
      <div className="show-pokemon detalis">
        {/* IMAGES */}
        <div className="img-container">
          {Object.entries(pokDetalis.sprites)
            .sort(([key], [key2]) => (key > key2 ? -1 : 1))
            .map(
              ([key, src]) =>
                typeof src === 'string' && (
                  <div key={key} className="box-img">
                    <img src={src} alt={key} />
                  </div>
                )
            )}
        </div>

        <div className="right-sidebar-detalis">
          <div className="favorite-checkbox">
            <Checkbox
              icon={<FavoriteBorder className="icon-border" />}
              checkedIcon={<Favorite className="icon-active" />}
              checked={!!isFavorite}
              onChange={handleCheckboxInput}
              inputProps={{ 'aria-label': 'favorite' }}
            />
          </div>
          <div className="info-detalis">
            <div className="topLine">
              <div className="line name">
                <span className="key">Name</span>
                <span className="value">{pokDetalis.name}</span>
              </div>
              <div className="line id">
                <span className="key">ID</span>
                <span className="value">{pokDetalis.id}</span>
              </div>
              <div className="line">
                <span className="key">Base experience</span>
                <span className="value">{pokDetalis.base_experience}</span>
              </div>
              <div className="line">
                <span className="key">Weight</span>
                <span className="value">{pokDetalis.weight}</span>
              </div>
              <div className="line">
                <span className="key">Height</span>
                <span className="value">{pokDetalis.height}</span>
              </div>
              <div className="line">
                <span className="key">Order</span>
                <span className="value">{pokDetalis.order}</span>
              </div>
              <div className="line">
                <span className="key">Is default</span>
                <span className="value">{pokDetalis.is_default ? 'true' : 'false'}</span>
              </div>
            </div>
          </div>

          <div className="table-info-detalis">
            <TableComponent stat={pokDetalis.stats} color={pokeColor} />
            <TableComponent type={pokDetalis.types} color={pokeColor} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowPoke
