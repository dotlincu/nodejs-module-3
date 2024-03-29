import { Request, Response } from 'express';
import { Product } from '../models/Product';
import { User } from '../models/User';
import { Op } from 'sequelize';

export const home = async (req: Request, res: Response) => {
    const [ usuario, created ] = await User.findOrCreate({
        where: { age: 27 },
        defaults: {
            name: 'Lucas'
        }
    });

    console.log("USUARIO: ", usuario);
    console.log("CREATED: ", created);






    let users = await User.findAll({
        order: ['age','name']
    });
    
    let age: number = 90;
    let showOld: boolean = false;

    if(age > 50) {
        showOld = true;
    }

    let list = Product.getAll();
    let expensiveList = Product.getFromPriceAfter(12);

    res.render('pages/home', {
        name: 'Bonieky',
        lastName: 'Lacerda',
        showOld,
        products: list,
        expensives: expensiveList,
        frasesDoDia: ['Bom dia flor do dia'],
        users
    });
};

