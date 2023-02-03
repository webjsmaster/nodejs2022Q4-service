import DBEntity from './DBEntity';

export type ArtistEntity = {
  id: string;
  name: string;
  grammy: boolean;
};
export type CreateArtistDTO = Omit<ArtistEntity, 'id'>;
export type ChangeArtistDTO = Partial<Omit<ArtistEntity, 'id'>>;

export default class DBArtists extends DBEntity<
    ArtistEntity,
    CreateArtistDTO,
    ChangeArtistDTO
> {
  async create(dto: ArtistEntity) {
    this.entities.push(dto);
    return dto;
  }
}
