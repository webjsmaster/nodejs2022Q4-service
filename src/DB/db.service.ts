import { Injectable } from '@nestjs/common';
import DBUsers from './entities/DBUsers';
import * as lodash from 'lodash';
import DBArtists from './entities/DBArtists';
import DBTracks from './entities/DBTracks';
import DBAlbum from './entities/DBAlbum';
import DBFavorites from './entities/DBFavorites';

@Injectable()
export class DB {
  users = new DBUsers();
  artist = new DBArtists();
  tracks = new DBTracks();
  album = new DBAlbum();
  favorites = new DBFavorites();

  constructor() {
    const deepCopyResultTrap: ProxyHandler<any> = {
      get: (target, prop) => {
        if (typeof target[prop] === 'function') {
          return (...args: any[]) => {
            const result = target[prop](...args);
            if (result instanceof Promise) {
              return result.then((v) => lodash.cloneDeep(v));
            }
            return lodash.cloneDeep(result);
          };
        } else {
          return target[prop];
        }
      },
    };
    for (const [k, v] of Object.entries(this)) {
      this[k as keyof typeof this] = new Proxy(v, deepCopyResultTrap);
    }
  }
}
