import { Injectable } from '@nestjs/common';
import { DB } from 'src/DB/db.service';

@Injectable()
export class FavoritesService {
  constructor(private db: DB) {}

  async getAll() {
    console.log('📌:', this.db.favorites.getFav());
  }

  getArtist() {
    return this.db.favorites.getFav();
  }

  async addArtist(id: string) {
    this.db.favorites.addArt(id);
  }

  async deleteArtist(id: string) {
    console.log('📌:', this.db.favorites.getFav());
  }
}
