import { Request, Response } from 'express';
import { Product } from '../models/Product';
import { User } from '../models/User';
import { Op } from 'sequelize';

export const home = async (req: Request, res: Response) => {

    let result = await User.findAll({ where: { id: 7 } });
    if(result.length > 0){
        let usuario = result[0];
        usuario.name = 'Claudio';
        usuario.age = 46;
        await usuario.save();
    }
    console.log(result);

    let users = await User.findAll({
        order: ['age']
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
        frasesDoDia: [],
        users
    });
};

export const CreateNewUser = async (req: Request, res: Response) => {
    let newUserName: string = req.body.name;
    let newUserAge: number = parseInt(req.body.age);

    if(newUserName){
        let firstLetterUpperCase = newUserName[0].toUpperCase();
        if(newUserAge){
            const newUser = User.build({
                name: firstLetterUpperCase + newUserName.slice(1),
                age: newUserAge
            });
            console.log("Id: ", newUser.id);
            console.log("Nome: ", newUser.name);
            console.log("Idade: ", newUser.age);
        } else {
            const newUser = User.build({
                name: firstLetterUpperCase + newUserName.slice(1)
            });
            console.log("Id: ", newUser.id);
            console.log("Nome: ", newUser.name); 
            console.log("Idade: ", newUser.age);
        }

        // await newUser.save();

        
    }
    res.redirect('/');
};