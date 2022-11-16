const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Activity", {
    id:{
     type:DataTypes.UUID,
     defaultValue:DataTypes.UUIDV4,
     primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    dificulty: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5,
        isEven(value) {
          if(value < 1 || value > 5) {
            throw new Error('Solo valores entre 1 y 5')
          }
        }
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 24,
        isEven(value) {
          if(value < 1 || value > 24) {
            throw new Error('Solo valores entre 1 y 24')
          }
        }
      }
    },
    season: {
      type: DataTypes.ENUM ('Verano', 'Otoño', 'Invierno', 'Primavera'),
      allowNull: true,
    },
    create: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  },{
    timestamps:false
  });
};
