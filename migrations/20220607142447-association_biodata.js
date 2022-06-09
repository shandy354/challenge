'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('userBiodata',{
      fields:['userId'],
      type:'foreign key',
      name:'association_biodata',
      references:{
        table:'Users',
        field:'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('userBiodata',{
      fields:['userId'],
      type:'foreign key',
      name:'association_biodata',
      references:{
        table:'Users',
        field:'id'
      }
    })
  }
};
