export type FavoritesEntity = {
  artists: string[] // favorite artists ids
  albums: string[] // favorite albums ids
  tracks: string[] // favorite tracks ids
}

export default class DBFavorites {
  favorites: FavoritesEntity = {
    albums: [],
    artists: [],
    tracks: [],
  }

  getFavorites = () => {
    return this.favorites
  }

  add = (id: string, type: string) => {
    switch (type) {
      case 'artist': {
        return this.favorites.artists.push(id)
      }
      case 'album': {
        return this.favorites.albums.push(id)
      }
      case 'track': {
        return this.favorites.tracks.push(id)
      }
    }
  }

  delete = (id: string, type: string) => {
    switch (type) {
      case 'artist': {
        const arr: string[] = this.favorites.artists.filter((el) => el !== id)
        return (this.favorites.artists = arr)
      }
      case 'album': {
        const arr: string[] = this.favorites.albums.filter((el) => el !== id)
        return (this.favorites.albums = arr)
      }
      case 'track': {
        const arr: string[] = this.favorites.tracks.filter((el) => el !== id)
        return (this.favorites.tracks = arr)
      }
    }
  }

  find = (id: string, type: 'artist' | 'album' | 'track') => {
    switch (type) {
      case 'artist': {
        return this.favorites.artists.indexOf(id)
      }
      case 'album': {
        return this.favorites.albums.indexOf(id)
      }
      case 'track': {
        return this.favorites.tracks.indexOf(id)
      }
    }
  }
}
