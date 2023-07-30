import { Table, Column, Model, Unique, DataType, AllowNull, Default } from 'sequelize-typescript';

@Table({ timestamps: true })
class Tag extends Model {
    @Unique({ name: 'name', msg: 'Name duplicated' })
    @AllowNull(false)
    @Column(DataType.STRING)
    	name!: string;

    @AllowNull(false)
    @Column
    	description!: string;

    @Column
    	username!: string;

    @Default(0)
    @AllowNull(false)
    @Column
    	usage_count!: number;

}

export default Tag;