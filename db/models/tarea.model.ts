import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Materia from "./materia.model";

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

    @AllowNull(false)
    @BelongsTo(() => Materia, {as: "tareaMateria"})
    @Column(DataType.NUMBER)
    materia!: Materia; // Use 'taskMateria' instead of 'materia' for the association name.
}

export default Tarea;