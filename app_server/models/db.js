const mongoose = require('mongoose');
const dbURI = "mongodb://localhost/Loc8r";
mongoose.connect(dbURI)

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error',err => {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// cut db connection before nodemon restart/app termination/Heroku app shutdown

const gracefulShutdown = (msg, cb) => {
    mongoose.connection.close(() => {
        console.log("Mongoose disconnected through ", msg)
        cb()
    })
}

process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2')
    })
})


process.once('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0)
    })
})

process.once('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
        process.exit(0)
    })
})
