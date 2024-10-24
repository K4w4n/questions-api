import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.table('questions', function (table) {
        table.uuid('examEditionId').nullable();
        table.foreign('examEditionId').references('id').inTable('exam_editions').onDelete('SET NULL');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.table('questions', function (table) {
        table.dropForeign(['examEditionId']);
        table.dropColumn('examEditionId');
    });
}
