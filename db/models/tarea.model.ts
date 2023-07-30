import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, NotNull, Table } from 'sequelize-typescript';
import Materia from './materia.model';

@Table({ timestamps: true })
class Tarea extends Model {
	@AllowNull(false)
	@Column
		titulo!: string;

	@Column
		contenido!: string;

	@ForeignKey(() => Materia)
	@Column
		materiaId!: number;

	@BelongsTo(() => Materia)
		materia!: Materia; // Use 'taskMateria' instead of 'materia' for the association name.
}

export default Tarea;