var rp = require('request-promise');
class ClashPlayerApi {


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
      return response
    // POST failed...
  });
    return response
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
              let status;
              await rp(request)
              .then(async function(response) {
                  if(!response.length){
                      status = false
                  } else {
                      status = true
             for(const data of response){
                 array.push(data.playerTag)
             }
            }
              })
              .catch(function(err) {
                  throw new Error('Error!\n\n' + err)
                // POST failed...
              });
if(!status) throw new Error('No Player Tags found for the user!')
if(!status) return;
return array
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
return response
    // POST failed...
  });
    return response
    }

}
module.exports = ClashPlayerApi;