export class FavoriteDto {
  artists: string[] // favorite artists ids
  albums: string[]
  tracks: string[] // favorite tracks ids

  constructor(partial: Partial<FavoriteDto>) {
    Object.assign(this, partial)
  }
}
