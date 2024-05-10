import chalk from 'chalk';
import morgan from 'morgan';

export function customLogger() {
  return (req, res, next) => {

    let resBody;
    let oldSend = res.send;
    res.send = function(data) {
      resBody = data;
      oldSend.apply(res, arguments);
    };

    morgan.token('req-body', function (req, res) {
      return JSON.stringify(req.body);
    });

    const loggerMiddleware = morgan(function (tokens, req, res) {
      if(tokens==undefined){return null;}

      const status = tokens.status(req, res);
      const method = tokens.method(req, res);
      const endpoint = tokens.url(req, res);
      const resTime = tokens['response-time'](req, res);
      const reqBody = tokens['req-body'](req, res);
      const datetime = new Date().toLocaleString();

      if(status < 200) {
        console.log(chalk.yellow.bold(`${datetime} | `) + chalk.bgYellow.bold(` ${ status } `) + chalk.yellow.bold(` | ${method} | URL : ${endpoint} | ${resTime} ms | Req-Body : ${reqBody} | Res-Body : ${resBody}`));
      }
      else if (status >= 200 && status < 300) {
        console.log(chalk.green.bold(`${datetime} | `) + chalk.bgGreen.bold(` ${ status } `) + chalk.green.bold(` | ${method} | URL : ${endpoint} | ${resTime} ms | Req-Body : ${reqBody} | Res-Body : ${resBody}`));
      } 
      else if(status >= 300 && status < 400){
        console.log(chalk.blue.bold(` ${datetime} | `) + chalk.bgBlue.bold(` ${status} `) + chalk.blue.bold(` | ${method} | URL : ${endpoint} | ${resTime} ms | Req-Body : ${reqBody} | Res-Body : ${resBody}`));
      }
      else if(status >= 400 && status < 500) {
        console.log(chalk.red.bold(` ${datetime} | `) + chalk.bgRed.bold(` ${status} `) + chalk.red.bold(` | ${method} | URL : ${endpoint} | ${resTime} ms | Req-Body : ${reqBody} | Res-Body : ${resBody}`));
      }
      else{
        console.log(chalk.magenta.bold(` ${datetime} | `) + chalk.bgMagenta.bold(` ${status} `) + chalk.magenta.bold(` | ${method} | URL : ${endpoint} | ${resTime} ms | Req-Body : ${reqBody} | Res-Body : ${resBody}`));
      }
    });

    loggerMiddleware(req, res, next);
  };
}