'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('UserRoles',{
      fields:['roleId'],
      type:'foreign key',
      name:'association_role',
      references:{
        table:'Roles',
        field:'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('UserRoles',{
      fields:['roleId'],
      type:'foreign key',
      name:'association_role',
      references:{
        table:'Roles',
        field:'id'
      }
    })
  }
};
