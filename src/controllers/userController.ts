import { Request, Response } from 'express';
import { User } from '../models/User';

export const nome = (req: Request, res: Response) => {
    let nome: string = req.query.nome as string;
    let idade: string = req.query.idade as string;

    res.render('pages/nome', {
        nome,
        idade
    });
};

export const idadeForm = (req: Request, res: Response) => {
    res.render('pages/idade');
};

export const idadeAction = (req: Request, res: Response) => {
    let mostrarIdade: boolean = false;
    let idade: number = 0;

    if(req.body.ano) {
        let anoNascimento: number = parseInt(req.body.ano as string);
        let anoAtual: number = new Date().getFullYear();
        idade = anoAtual - anoNascimento;
        mostrarIdade = true;
    }

    res.render('pages/idade', {
        idade,
        mostrarIdade
    });
};

export const CreateNewUser = async (req:Request, res: Response) => {
    let newUserName: string = req.body.name;
    let newUserAge: number = parseInt(req.body.age);
    
    if(newUserName)
        newUserName[0].toUpperCase();
    
    res.render('pages/new', {
        newUserName,
        newUserAge
    })
};

export const ActionCreateNewUser = async (req: Request, res: Response) => {
    let name = req.body.name;
    let age = parseInt(req.body.age);
    if(name)
        name = name[0].toUpperCase() + name.slice(1);
    if(req.body.age){
        await User.create({ name: name, age: age});

    } else {
        await User.create({ name: name });
    }
    res.redirect('/');
};

export const Update = async (req: Request, res: Response) => {
    let id = parseInt(req.params.id);
    let name: string = '';
    let age: number = 0;

    let user = await User.findAll({ where: { id } });
    name = user[0].name;
    age = user[0].age;

    res.render('pages/update', {
        name, 
        age, 
        id
    })
};

export const ActionUpdate = async (req: Request, res: Response) => {
    let {id, name, age} = req.body;

    if(name)
        name = name[0].toUpperCase() + name.slice(1);
    await User.update({ name, age }, { where: { id } });
    res.redirect('/');
};

export const Delete = async (req: Request, res: Response) => {
    let userId = parseInt(req.params.id);
    let result = await User.findAll({ where: { id: userId } });
    if( result.length > 0){
        let user = result[0];
        await user.destroy();
    }
    res.redirect('/');
};

export const IncreaseAge = async (req: Request, res: Response) => {
    let userId = parseInt(req.params.id);
    let result = await User.findAll({ where: { id: userId } });
    if( result.length > 0){
        let user = result[0];
        user.age++;
        await user.save();
    }
    res.redirect('/');
};

export const DecreaseAge = async (req: Request, res: Response) => {
    let userId = parseInt(req.params.id);
    let result = await User.findAll({ where: { id: userId } });
    if( result.length > 0){
        let user = result[0];
        user.age--;
        await user.save();
    }
    res.redirect('/');
};