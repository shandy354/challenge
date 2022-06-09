'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   queryInterface.addConstraint('UserRoles',{
     fields:['userId'],
     type:'foreign key',
     name:'association_user',
     references:{
       table:'Users',
       field:'id'
     }
   })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('UserRoles',{
      fields:['userId'],
      type:'foreign key',
      name:'association_user',
      references:{
        table:'Users',
        field:'id'
      }
    })
  }
};
