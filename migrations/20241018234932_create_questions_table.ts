import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('questions', (table) => {
        table.string('id', 36).primary();
        table.text('contentHTML');
        table.enum('type', ['alternative', 'essay'])
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('questions');
}

