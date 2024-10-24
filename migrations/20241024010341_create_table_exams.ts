import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('exams', (table) => {
        table.string('id', 36).primary();

        table.text('name');
        table.text('description');

        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('exams');
}

