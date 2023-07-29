import {AllowNull, Column, DataType, HasMany, Model, Table, Unique} from "sequelize-typescript";
import Tarea from "./tarea.model";


@Table({timestamps: true})
class Materia extends Model {
    @Unique({name: 'materia', msg: 'Solo puede haber una materia'})
    @AllowNull(false)
    @Column
    nombre!: string

    @AllowNull(false)
    @Column
    guildId!: string


    @AllowNull
    @HasMany(() => Tarea, {as: "tareaMateria"}) // Use 'tareas' instead of 'materias' for the association name.
    @Column(DataType.NUMBER)
    tarea!: Tarea[]; // Use Tarea[] instead of Tarea[] | number.
}

export default Materia