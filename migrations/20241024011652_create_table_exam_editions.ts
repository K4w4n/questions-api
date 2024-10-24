import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('exam_editions', (table) => {
        table.string('id', 36).primary();

        table.text('name');
        table.smallint('year').unsigned().nullable();
        table.text('description');
        table.uuid('examId').notNullable();

        table.timestamps(true, true);
        
        table.foreign('examId').references('id').inTable('exams').onDelete('CASCADE');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('exam_editions');
}

