/**
 * Created by rohail on 1/9/2017.
 */

module.exports = function (app,express, mysqlConnection) {

  let router = express.Router();

  router.route('/users')
    .get((req,res)=> {
      mysqlConnection.query('SELECT * FROM `users` ', function (error, results) {
        if(error){
          res.json({data : error});
          res.end();
        }else {
          res.json({data : results});
          res.end();
        }
      });
    })
    .post((req,res)=> {
      mysqlConnection.query({
        sql: 'insert into `users` (first_name,last_name,job) values (?,?,?)',
        values : [req.body.firstName,req.body.lastName,req.body.job],
      },(error,results) => {
        if(error){
          res.json({data : error});
          res.end();
        }else {
          res.json({data : results});
          res.end();
        }
      })
    });

  router.route('/users/:name')
    .get((req,res)=> {
      mysqlConnection.query({
        sql: 'CALL GetUserByFirstName(?)',
        values : [req.params.name],
      },(error,results) => {
        if(error){
          res.json({data : error});
          res.end();
        }else {
          res.json({data : results});
          res.end();
        }
      })
    })
    .put((req,res)=> {
      mysqlConnection.query({
        sql: 'update `users` set first_name = ? ,last_name = ?,job = ? where first_name = ? ',
        values : [req.body.firstName,req.body.lastName,req.body.job,req.params.name],
      },(error,results) => {
        if(error){
          res.json({data : error});
          res.end();
        }else {
          res.json({data : results});
          res.end();
        }
      })
    })
    .delete((req,res)=> {
      mysqlConnection.query({
        sql: 'delete from `users` where first_name = ? ',
        values : [req.params.name],
      },(error,results) => {
        if(error){
          res.json({data : error});
          res.end();
        }else {
          res.json({data : results});
          res.end();
        }
      })
    });

  app.use(router);
};