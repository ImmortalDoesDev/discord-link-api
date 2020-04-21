var rp = require('request-promise');
class DiscordLinkApi {


    constructor({username, password} = {}) {
        this.username = username
        this.password = password
        if(!this.username){
            throw new Error('Please define a username');
        }
        if(!this.password){
            throw new Error('Please define a password')
        }
        let token = "";
        var options = {
            method: "POST",
            uri: "https://api.amazingspinach.com/login",
            body: {
              username: this.username, //username mike gave you
              password: this.password //password mike gave you
            },
            json: true
          };

         rp(options)
            .then(function(parsedBody) {
              token = parsedBody.token;
              // POST succeeded..
            })
            .catch(function(err) {
                throw new Error('Couldn\'t authenticate with the username and password provided!\n\n' + err)
              // POST failed...
            });
    }
    async link(tag, discord){
        if(!tag){
            throw new Error('You didn\'t specify the player tag!')
        }
        if(!discord){
            throw new Error('You didn\'t specify the discord ID!')
        }
        let token = "";
        var options = {
            method: "POST",
            uri: "https://api.amazingspinach.com/login",
            body: {
              username: this.username, //username mike gave you
              password: this.password //password mike gave you
            },
            json: true
          };

          await rp(options)
            .then(function(parsedBody) {
              token = parsedBody.token;
              // POST succeeded...
            })
            .catch(function(err) {
                throw new Error('Couldn\'t authenticate with the username and password provided!\n\n' + err)
              // POST failed...
            });
        var optionss = {
            method: "POST",
            uri: "https://api.amazingspinach.com/links",
            headers: {
              Authorization: "Bearer ".concat(token)
            },
            body: {
              playerTag: tag,
              discordId: discord
            },
            json: true
          };
let response;
await rp(optionss)
.then(function(parsedBody) {
if(parsedBody === 'undefined' || parsedBody === undefined || parsedBody === /undefined/){
    response = {
        message: 'Success',
        statusCode: 200
    }
} else {
    response = {
        message: parsedBody,
        statusCode: 503
    }
}
  })
  .catch(function(err) {
      response = {
          message: err.message,
          statusCode: err.statusCode
      }
  });
  if(response.statusCode === 200){
return response
} else {
  var error = new Error(response.message);
  error.statusCode = response.statusCode

  return myCallback(error);
}
    }

    async search(tag){
        if(!tag){
            throw new Error('You didn\'t specify the player tag or discord id!')
        }
        let token = "";
        var options = {
            method: "POST",
            uri: "https://api.amazingspinach.com/login",
            body: {
              username: this.username, //username mike gave you
              password: this.password //password mike gave you
            },
            json: true
          };

          await rp(options)
            .then(function(parsedBody) {
              token = parsedBody.token;
              // POST succeeded...
            })
            .catch(function(err) {
                throw new Error('Couldn\'t authenticate with the username and password provided!\n\n' + err)
              // POST failed...
            });
        if(tag.startsWith('#')){
            var request = {
                uri: "https://api.amazingspinach.com/links/" + tag.replace("#", ""),
                headers: {
                  Authorization: "Bearer ".concat(token)
                },
                json: true
              };
              let discord;
            await rp(request)
            .then(async function(response) {
               console.log(response)
            })
            .catch(function(err) {
                discord = {
                    message: err.message,
                    statusCode: err.statusCode
                }
                return discord;
            });
            return discord;
        } else {
            var request = {
                uri: "https://api.amazingspinach.com/links/" + tag,
                headers: {
                  Authorization: "Bearer ".concat(token)
                },
                json: true
              };
              let array = []
let r = false;
              await rp(request)
              .then(async function(response) {
                  if(!response.length){
                    r = {
                    message: 'No Player Tags found for the user!',
                    statusCode: 4040
                    }
                  } else {
             for(const data of response){
                 array.push(data.playerTag)
             }
            }
              })
              .catch(function(err) {
r = {
message: err.message,
statusCode: err.statusCode
}
              });
if(r === false){
return array
} else {
  var error = new Error(response.message);
  error.statusCode = response.statusCode

  return myCallback(error);
}
        }
    }
    async update(tag, discord){
        if(!tag){
            throw new Error('You didn\'t specify the player tag!')
        }
        if(!discord){
            throw new Error('You didn\'t specify the discord ID!')
        }
        let token = "";
        var options = {
            method: "POST",
            uri: "https://api.amazingspinach.com/login",
            body: {
              username: this.username, //username mike gave you
              password: this.password //password mike gave you
            },
            json: true
          };

          await rp(options)
            .then(function(parsedBody) {
              token = parsedBody.token;
              // POST succeeded...
            })
            .catch(function(err) {
                throw new Error('Couldn\'t authenticate with the username and password provided!\n\n' + err)
              // POST failed...
            });
        var optionss = {
            method: "PUT",
            uri: "https://api.amazingspinach.com/links",
            headers: {
              Authorization: "Bearer ".concat(token)
            },
            body: {
              playerTag: tag,
              discordId: discord
            },
            json: true
          };
          let response;
await rp(optionss)
.then(function(parsedBody) {
    if(parsedBody === 'undefined' || parsedBody === undefined || parsedBody === /undefined/){
        response = {
            message: 'Success',
            statusCode: 200
        }
    } else {
        response = {
            message: parsedBody,
            statusCode: 503
        }
    }
  })
  .catch(function(err) {
response = {
    message: err.message,
    statusCode: err.statusCode
}
  });
if(response.statusCode === 200){
return response
}  else {
  var error = new Error(response.message);
  error.statusCode = response.statusCode

  return myCallback(error);
}
    }

}
module.exports = DiscordLinkApi;
