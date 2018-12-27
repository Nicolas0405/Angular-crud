const express = require('express');
const morgan = require('morgan');
const cors = require ('cors');
const app = express();

const { mongoose } = require('./database');

//settigns
//configuracion del servidor
app.set('port', process.env.PORT || 4000);
//Middlewares
//morgan  es una funcion para ver los mensjaes en console
app.use(morgan('dev'))
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

//routes
app.use('/api/employees',require('./routes/employee.routes'));

//Starting the server
app.listen(app.get('port'), () => {
    console.log("Server on port " , app.get('port'));
})