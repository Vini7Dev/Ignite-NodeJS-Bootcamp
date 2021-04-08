import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class CreateSpecificationsCars1617878654589
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'specifications_cars',
                columns: [
                    {
                        name: 'car_id',
                        type: 'uuid',
                    },
                    {
                        name: 'specification_id',
                        type: 'uuid',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'specifications_cars',
            new TableForeignKey({
                name: 'fk_specifications_cars_car_id',
                columnNames: ['car_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'cars',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'specifications_cars',
            new TableForeignKey({
                name: 'fk_specifications_cars_specification_id',
                columnNames: ['specification_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'specifications',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            'specifications_cars',
            'fk_specifications_cars_specification_id',
        );

        await queryRunner.dropForeignKey(
            'specifications_cars',
            'fk_specifications_cars_car_id',
        );

        await queryRunner.dropTable('specifications_cars');
    }
}
