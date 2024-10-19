import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('essay_answers', (table) => {
        table.string('id', 36).primary();
        table.uuid('questionId').notNullable();
        table.text('contentHTML');
        table.timestamps(true, true);

        table.foreign('questionId').references('id').inTable('questions').onDelete('CASCADE');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('essay_answers');
}

