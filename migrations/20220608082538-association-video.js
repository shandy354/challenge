'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('Videos',{
      fields:['userId'],
      type:'foreign key',
      name:'association_video',
      references:{
        table:'Users',
        field:'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('Videos',{
      fields:['userId'],
      type:'foreign key',
      name:'association_video',
      references:{
        table:'Users',
        field:'id'
      }
    })
  }
};
