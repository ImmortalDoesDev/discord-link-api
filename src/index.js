var rp = require('request-promise');
class DiscordLinkApi {


    constructor({username, password} = {}) {
        this.username =  username || process.env.DLA_API_USERNAME
        this.password = password || process.env.DLA_API_PASSWORD
        if(!this.username){
            throw new Error('Please define a username');
        }
        if(!this.password){
            throw new Error('Please define a password')
        }
        let token = "";
        var options = {
            method: "POST",
            uri: "https://cocdiscordlink.azurewebsites.net/api/login",
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
            uri: "https://cocdiscordlink.azurewebsites.net/api/login",
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
            uri: "https://cocdiscordlink.azurewebsites.net/api/links",
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
  function Failed(message, code) {
     this.message = message;
     this.statusCode = code;
  }
throw new Failed(response.message, response.statusCode)
}
    }

    async search(tag){
        if(!tag){
            throw new Error('You didn\'t specify the player tag or discord id!')
        }
        let token = "";
        var options = {
            method: "POST",
            uri: "https://cocdiscordlink.azurewebsites.net/api/login",
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
          let search = tag.startsWith("#") ? tag.replace("#", "%23").toUpperCase() : "%23"+tag.toUpperCase();
              var request = {
                uri: "https://cocdiscordlink.azurewebsites.net/api/links/" + search,
                headers: {
                  Authorization: "Bearer ".concat(token)
                },
                json: true // Automatically parses the JSON string in the response
              };
          let r = false;
let id;
              await rp(request)
                .then(function(response) {
if(!response.length){
  r = {
  message: 'Not Linked to any discord ID',
  statusCode: 404
  }
} else {
id = response[0].discordId
}
})
.catch(function(err) {
r = {
message: err.message,
statusCode: err.statusCode
}
});
if(r === false){
return id
} else {
  function Failed(message, code) {
     this.message = message;
     this.statusCode = code;
  }
throw new Failed(r.message, r.statusCode)
}
        } else {
            var request = {
                uri: "https://cocdiscordlink.azurewebsites.net/api/links/" + tag,
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
                    statusCode: 404
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
  function Failed(message, code) {
     this.message = message;
     this.statusCode = code;
  }
throw new Failed(r.message, r.statusCode)
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
            uri: "https://cocdiscordlink.azurewebsites.net/api/login",
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
            uri: "https://cocdiscordlink.azurewebsites.net/api/links/",
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
  function Failed(message, code) {
     this.message = message;
     this.statusCode = code;
  }
throw new Failed(response.message, response.statusCode)
}
    }

}
module.exports = DiscordLinkApi;
