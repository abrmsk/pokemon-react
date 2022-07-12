import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FavoriteBorder } from '@mui/icons-material'
import Favorite from '@mui/icons-material/Favorite'
import { Button, Checkbox } from '@mui/material'
import { Pokemon } from 'pokenode-ts'
import { pokeApi } from '../../api'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import Rainbow from '../preloaders/Rainbow/Rainbow'
import { IPropsPokeItem } from './PokeItem.props'
import './PokeItem.scss'

const PokeItem: React.FC<IPropsPokeItem> = ({ name }): JSX.Element => {
  const favorites = useTypedSelector((state) => state.poke.favorites)
  const navigate = useNavigate()

  const { addFavorite, removeFavorite } = useActions()
  const [detalisPokemon, setDetalisPokemon] = useState<Pokemon | null>(null)
  const [colorPokemon, setColorPokemon] = useState<string | null>(null)
  const isMountedVal = useRef(1)

  const getElement = async () => {
    const response = (await pokeApi.pokemon.getPokemonByName(name)) as Pokemon
    const urlSpecies = response.species.url
    const numPos = urlSpecies.lastIndexOf('/', urlSpecies.length - 2)
    const numStr = urlSpecies.slice(numPos + 1, -1)

    const responseSpecies = await pokeApi.pokemon.getPokemonSpeciesById(+numStr)
    const colorName = responseSpecies.color.name

    if (isMountedVal.current) {
      setDetalisPokemon(response)
      setColorPokemon(colorName)
    }
  }

  useEffect(() => {
    isMountedVal.current = 1
    getElement()
    return () => {
      isMountedVal.current = 0
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!detalisPokemon)
    return (
      <div className="item card-element box-preloader">
        <Rainbow />
      </div>
    )

  const isFavorite = favorites.find((name) => name === detalisPokemon.name)

  const handleCheckboxInput = () => {
    if (isFavorite) {
      removeFavorite(detalisPokemon.name)
    } else {
      addFavorite(detalisPokemon.name)
    }
  }

  const handlerShowDetalis = () => {
    navigate(`/pokemon/${detalisPokemon.id}`)
  }

  return (
    <div className={`item card-element detalis ${colorPokemon}`}>
      <div className="top-line">
        <Checkbox
          icon={<FavoriteBorder className="icon-border" />}
          checkedIcon={<Favorite className="icon-active" />}
          checked={!!isFavorite}
          onChange={handleCheckboxInput}
          inputProps={{ 'aria-label': 'favorite' }}
        />
        <span className="id">{detalisPokemon.id}</span>
      </div>

      <div className="header">
        <h2 className="name">{detalisPokemon.name}</h2>
      </div>
      <div className="img-box">
        <img src={detalisPokemon.sprites.front_default || ''} alt="f-default" />
      </div>
      <div className="bottom-box">
        <p className="weight row">
          <span className="param">weight</span>
          <span className="delimiter" />
          <span className="value">{detalisPokemon.weight}</span>
        </p>
        <p className="height row">
          <span className="param">height</span>
          <span className="delimiter" />
          <span className="value">{detalisPokemon.height}</span>
        </p>
        <p className="order row">
          <span className="param">order</span>
          <span className="delimiter" />
          <span className="value">{detalisPokemon.order}</span>
        </p>
        <p className="base-experience row">
          <span className="param">base experience</span>
          <span className="delimiter" />
          <span className="value">{detalisPokemon.base_experience}</span>
        </p>
      </div>
      <Button variant="outlined" id="button-show-detalis-item" onClick={handlerShowDetalis}>
        Show detalis
      </Button>
    </div>
  )
}

export default PokeItem
