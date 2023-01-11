const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },


    height_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    height_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    weight_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    weight_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
    life_span_min: {
      type: DataTypes.INTEGER,
    },

    life_span_max: {
      type: DataTypes.INTEGER,
    },

    image: {
      type: DataTypes.STRING,
      
    },

    createdInDb: { 
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }, 
  },

  { timestamps: false}
  
  );
};
