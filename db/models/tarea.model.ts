import {
	AllowNull,
	BelongsTo,
	Column,
	ForeignKey,
	Model,
	Table,
	Unique,
} from 'sequelize-typescript';
import Materia from './materia.model';

@Table({ timestamps: true })
class Tarea extends Model {
	@Unique
	@AllowNull(false)
	@Column
	titulo!: string;

	@Column
	contenido!: string;

	@ForeignKey(() => Materia)
	@Column
	materiaId!: number;

	@BelongsTo(() => Materia)
	materia!: Materia;
}

export default Tarea;