
// S30: Crear modelo de usuario
const { DataTypes } = require('sequelize');
const Op = require('sequelize').Op
//Exportamos una funcion que define el modelo de User,
//Le proveemos sequelize para su conexion con la misma.
module.exports = sequelize => {
    var User = sequelize.define('user', {

        // Definimos los parametros con los que debe cumplir el "User" para poder ser creado
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Name must be joined!'
                }
            }
        },
        lastName: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'last name must be joined!'
                }
            }
        },
        status:{
            type:DataTypes.ENUM,
            values:['login','log out'],
            defaultValue:'log out'
        },
        rol: {
            type: DataTypes.ENUM,
            values: ['user', 'admin'],
            defaultValue: 'user',
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Email must be joined!'
                },
                isUnique: function (value, next) {
                    User.findAll({
                        where: {
                            email: value,
                            id: { [Op.ne]: this.id }
                        }
                    })
                        .then(function (user) {
                            if (user.length == 0) {
                                next();
                            } else {
                                next('Email is already used!');
                            }
                        })
                        .catch(error => {
                            next(error);
                        })
                }
            }
        },
        password: {
            type: DataTypes.STRING,
        },
        passwordToken:{
            type: DataTypes.STRING,
            
        },
        resetPasswordExpires: { type: DataTypes.DATE },
        fullName:{
            type:DataTypes.VIRTUAL,
            get(){
              return this.name + ' ' + this.lastName;
            }
          }
    })
}