import { DBEntityFav } from './DBEntity';

export type FavoritesEntity = {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
};

export default class DBFavorites {
  favorites: FavoritesEntity = {
    albums: [],
    artists: [],
    tracks: [],
  };

  constructor() {
    // this.favorites.albums = []
    // this.favorites.artists = []
    // this.favorites.tracks = []
    this.getFav = this.getFav.bind(this);
    this.addArt = this.addArt.bind(this);
  }

  async getFavorites() {
    console.log('📢 [DBFavorites.ts:23]', this.favorites);
    return this.favorites;
  }

  async addArtist(id: string) {
    this.favorites.artists.push(id);
    return this.favorites.artists;
  }

  getFav = () => {
    console.log('📢 [DBFavorites.ts:23]', this.favorites);
    return this.favorites;
  };

  addArt = (id: string) => {
    this.favorites.artists.push(id);

    console.log('📌:ADD!!!!!======>>>', this.favorites);
  };

  async deleteArtist(id: string) {
    const arr: string[] = this.favorites.artists.filter(
      (artId) => artId !== id,
    );
    return (this.favorites.artists = arr);
  }
}

// export type CreateFavoritesDTO = Partial<FavoritesEntity>

// export default class DBFavorites extends DBEntityFav<
// 	FavoritesEntity,
// 	CreateFavoritesDTO
// > {
// 	async create(dto: FavoritesEntity) {
// 		console.log('📢 [DBFavorites.ts:25]', this)
// 		this.entities.push(dto)
// 		return dto
// 	}
// }
