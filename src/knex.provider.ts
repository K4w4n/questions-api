import { Provider } from '@nestjs/common';
import Knex from 'knex';
import knexConfig from '../knexfile';

export const KNEX_CONNECTION = 'KNEX_CONNECTION';

export const knexProviders: Provider[] = [
  {
    provide: KNEX_CONNECTION,
    useFactory: async () => {
      const knex = Knex(knexConfig[process.env.NODE_ENV || 'production']);
      return knex;
    },
  },
];