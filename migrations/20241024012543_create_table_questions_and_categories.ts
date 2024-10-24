import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('questions_and_categories', (table) => {
        table.string('id', 36).primary();

        table.uuid('questionId').notNullable();
        table.uuid('categoryId').notNullable();

        table.timestamps(true, true);
        
        table.foreign('questionId').references('id').inTable('questions').onDelete('CASCADE');
        table.foreign('categoryId').references('id').inTable('categories').onDelete('CASCADE');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('questions_and_categories');
}

