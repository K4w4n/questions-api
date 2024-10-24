import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('categories', (table) => {
        table.string('id', 36).primary();

        table.text('name');
        table.uuid('parentId').nullable();

        table.timestamps(true, true);

        table.foreign('parentId').references('id').inTable('categories').onDelete('CASCADE');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('categories');
}

