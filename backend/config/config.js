module.exports ={
    "development": {
      "username": process.env.DB_USERNAME || "root",
      "password": "root",
      "database": "senchat",
      "host":  process.env.DB_HOST || "localhost",
      "dialect": "mysql"
    },
    "test": {
      "username": process.env.DB_USERNAME || "root",
      "password": "root",
      "database": "senChat",
      "host":  process.env.DB_HOST || "localhost",
      "dialect": "mysql"
    },
    "production": {
      "username": "root",
      "password": null, 
      "database": "database_production",
      "host": "localhost",
      "dialect": "mysql"
    }
  }
  