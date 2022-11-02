const app = require("./app");
const port = process.env.PORT || 3997;
const {sequelize, db3} = require("./connection/connection");

global.__basedir = __dirname;

async function main()
{

      try {

          await sequelize.sync();

          await db3.sync();

          app.get("/", (request, response) => {
              response.json("Prestador-Service");
          });
            
          app.listen(port, () => {
              console.log(`App running on port ${port}.`);
          });

      } catch (error) {
        console.error(error);
      }
        
}

main();