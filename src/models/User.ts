import { Model, DataTypes } from 'sequelize';
// import { sequelize } from '../instances/mysql';
import { sequelize } from '../instances/pg';

export interface UserInstance extends Model {
    id: number;
    name: string;
    age: number;
};

export const User = sequelize.define<UserInstance>("User", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        get() {
            return this.getDataValue('name').toUpperCase();
        },
    },
    firstLetterOfName: {
        type: DataTypes.VIRTUAL,
        get() {
            let name: string = this.getDataValue('name');
            return name.charAt(0);
        },
    },
    age: {
        type: DataTypes.INTEGER,
        defaultValue: 18,
    }
}, {
    tableName: 'users',
    timestamps: false
});

// createdAt
// updateAt