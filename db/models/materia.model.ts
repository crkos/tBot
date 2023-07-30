import { AllowNull, Column, DataType, HasMany, Model, Table, Unique } from 'sequelize-typescript';
import Tarea from './tarea.model';


@Table({ timestamps: true })
class Materia extends Model {
	@Unique({ name: 'materia', msg: 'Solo puede haber una materia' })
	@AllowNull(false)
	@Column
	nombre!: string;

	@AllowNull(false)
	@Column
	guildId!: string;

	@HasMany(() => Tarea)
	tareas!: Tarea[];
}

export default Materia;