import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateRentals1619181427917 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'rentals',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'car_id',
                        type: 'uuid',
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                    },
                    {
                        name: 'start_date',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'end_date',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'expected_return_date',
                        type: 'timestamp',
                    },
                    {
                        name: 'total',
                        type: 'numeric',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'fk_rentals_car_id',
                        columnNames: ['car_id'],
                        referencedTableName: 'cars',
                        referencedColumnNames: ['id'],
                        onDelete: 'SET NULL',
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'fk_rentals_user_id',
                        columnNames: ['user_id'],
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        onDelete: 'SET NULL',
                        onUpdate: 'CASCADE',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('rentals');
    }
}
