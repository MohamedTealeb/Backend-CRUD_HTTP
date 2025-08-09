import { Sequelize } from "sequelize";
export const sequelize = new Sequelize('bfwzisjl7awda7czodqf', 'uipanxi6i3dv3jsv', 'Y7Qz5SAzJ2K3tvecSZbN', {
    host: 'bfwzisjl7awda7czodqf-mysql.services.clever-cloud.com',
    port: 3306,
    dialect: 'mysql',
    
  });
export const checkDBConnection = async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
export const syncDBConnection = async()=>{
    try {
       const result= await sequelize.sync({alter:true,force:false});
        console.log('sync has been established successfully.');
       
        ;
        
      } catch (error) {
        console.error('Unable to sync to the database:', error);
      }
}