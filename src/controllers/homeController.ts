import { Request, Response } from 'express';
import { Op } from 'sequelize';

import { Product } from '../models/Product';
import { User } from '../models/User';

export const home = async (req: Request, res: Response) => {

    //usando o model
    //------------------------------- Tipos de Consulta Aula 19 ---------------------------------------
    let users = await User.findAll({
        attributes: ['name', 'age', 'id']
    });

    /*
         //com condicionais 
         let users = await User.findAll({
             where: {name:"Hugo"}
         });
         let users = await User.findAll({
             where: {idade: 18, name:'Hugo'}
         });
      
     //para usar o comparador ou temos que importar o Op e usar da seguinte forma
     let users = await User.findAll({
         where: {[Op.or]: [
             {age: 32},
             {name: 'Hugo'}
         ]
         }
     });
 
 // ------------------------------TIpos de Consulta 2 //Aula 20 -----------------------------------
 
 //pegando valores maiores ou menores que um determinado valor 
 let users = await User.findAll({
     where: {
         age:{
             //[Op.gt]: 40, // todo mundo maior de 40 anos
             [Op.gte]: 18, //todo mundo com 40 ou mais 
             //[Op.lt]: 40, // todo mundo menos que 40
             [Op.lte]: 40 // menor ou igual a 40 
         }
     }
 });
 
 //se quisermos pegar valores maiores e menores basta fazer um between
 let users = await User.findAll({
     where: {
         age:{
             [Op.between]: [18,40]
         }
     }
 });
 
 //negando o between
 let users = await User.findAll({
     where: {
         age:{
             [Op.notBetween]: [18,40]
         }
     }
 });
 
 //buscando nome pelo fragmento do nome (like)
 let users = await User.findAll({
     where: {
         name:{
             [Op.like]: '%a%'
         }
     }
 });
 // ------------------------------Ordenando Resultados //Aula 21 -----------------------------------
 
     //fazendo uma ordenação
     let users = await User.findAll({
         where: {
             age: {
                 [Op.gte]: 18
             }
         },
         order: [
             ['age', 'ASC'],
             ['name', 'DESC']
 
         ]
     });
 
 
 //------------------------------limitando os resultados // Aula 22 -------------------------------
     //offset pular registros
     let users = await User.findAll({
         where: {
             age: {
                 [Op.gte]: 18
             }
         },
         offset: 0,
         limit: 2
 
     });
 
 //-----------------------------inserindo dados com o sequelize // Aula 23 -------------------------
 
 //cria uma instancia de um usuário 
 // o build serve para você ir montando o usuário aos poucos e no final você insere ele no banco
 const user = User.build({
     name: 'usuario teste edição JS',
     age: 25
 });
  */
    //salva o usuário no banco, para salvar descomentar a linha abaixo
    //await user.save();

    //create, com esse comando ele cria o usuário automaticamente. não precisando do save depois
    /*const user = await User.create({
        name: 'Fulano',
        age: 36
    });
    
    console.log("Nome", user.name);
    console.log("Age",user.age);
    
    */

    //-------------------------------- Atualizando dados com sequelize //Aula 25 --------------------
    /*
        await User.update({age:18},{
            where:{
                age:{
                    [Op.lt]:18
                }
            }
        });
        */
    //-------------------------------- Atualizando dados com sequelize 2 //Aula 26 --------------------
    //alteração em um item específico
    //atenção esse tipo de alteração agora só irá funcionar quando dermos um save
    /*
    let results = await User.findAll({where:{id:7}});
        if(results.length >0){
            let usuario = results[0];
            usuario.age = 70;
            await usuario.save();
        }
    */
    //-------------------------------- Deletando dados com sequelize //Aula 27 --------------------
    // deletando vários registros
    /*
    await User.destroy({
        where: {
            age: {
                [Op.lte]: 18
            }
        }
    });
    //deletando apenas um item 
    let results = await User.findAll({
        where: { name: 'Fulano' }
    });
    //pegando o primeiro resultado
    if (results.length > 0) {
        let usuario = results[0];

        await usuario.destroy();
    }
    */
//----------------------------- Métodos Finder // Aula 29 ------------------------------------------
//pega apenas o primero usuário da busca (ele retorna o usuário direto, e não um array)
/*
let usuario = await User.findOne({
    where:{
        id: 1
    }
});

//verificando se em usuário ou não
//para verificar ele ve se o usuario está como null ou não
if(usuario){
    console.log(`o usuário ${usuario.name} possui ${usuario.age} anos`);
}else{
    console.log("Usuário não encontrado")
}

//busca pela chave primária. (no nosso caso é id) 
let usuario = await User.findByPk(3);

if(usuario){
    console.log(`o usuário ${usuario.name} possui ${usuario.age} anos`);
}else{
    console.log("Usuário não encontrado")
}
*/

// verificando se o dado já existe antes de criar. (email)
/*
const [usuario, created ] = await User.findOrCreate({
    where:{name:"Hugo"},
    defaults: {
        age:90
    }
});

console.log("usuario", usuario);
console.log("created", created);
*/

//---------------------------------Métodos Getter/Setter //Aula 30 -------------------------------------
//feita no model User.ts

//---------------------------------Campos Virtuais//Aula 31 -------------------------------------
//feita no model User.ts

    let age: number = 90;
    let showOld: boolean = false;

    if (age > 50) {
        showOld = true;
    }

    let list = Product.getAll();
    let expensiveList = Product.getFromPriceAfter(12);

    res.render('pages/home', {
        name: 'Hugo',
        lastName: 'Pascoal',
        showOld,
        products: list,
        expensives: expensiveList,
        frasesDoDia: [],
        users
    });
};

export const newUser = async (req: Request, res: Response) => {

    let { name, age } = req.body;

    if (name) {
        const newUser = User.build({ name });
        if (age) {
            newUser.age = parseInt(age);
        }
        await newUser.save();
    }

    res.redirect('/');
};


