const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Driver', {

    id:{
      type:DataTypes.UUID,
      primaryKey: true,
      defaultValue:DataTypes.UUIDV4,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,

      set(value){
        // combierte el nombre que le llegue a minuscula antes de guardarlo en la db
        this.setDataValue("name", value.charAt(0).toUpperCase() + value.slice(1).toLowerCase());
      },

    },

    image:{
      type:DataTypes.STRING,
      allowNull: false,
    },

    // date of birth = d.o.b
    dob:{
      type:DataTypes.STRING,
      allowNull: false,
    },

    nationlity:{
      type:DataTypes.STRING,
      allowNull: false,
    },

    description:{
      type:DataTypes.TEXT,
      allowNull: false,
    },

    /*flag*/
    createdInDb: {
      type : DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      set(value){
        // Comvierte el balor en un booleano
        const boolValue = !!value;
        this.setDataValue('createdInDb',boolValue);
      }
    }
  }, {timestamps: false, freezeTableName: true});
};