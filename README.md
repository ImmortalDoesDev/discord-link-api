# discord-link-api
An API that will communicate with the DB to link, update and search players by player tags and discord Ids.

# First Things First!

```js
const discord-link-api = require('discord-link-api');
```

# Init

```js
let client = new discord-link-api({
username: 'YourUsername',
password: 'YourPassword'
})
```
You can also define the username and password in .env as `DLA_API_USERNAME` and `DLA_API_PASSWORD`

You can get your own username and password to access the DB by talking to **ReverendMike#6969** in the server: **https://discord.gg/Eaja7gJ**

---

## Link Players

```js
client
.link('#VQJPJY0L', '581442925611712513')
.then(res => console.log(res))
.catch(err => console.log(err))

//Response: { message: 'Success', statusCode: 200 }
```

## Update Players

```js
client
.update('#VQJPJY0L', '581442925611712513')
.then(res => console.log(res))
.catch(err => console.log(err))

//Response: { message: 'Success', statusCode: 200 }
```

## Search Player Tags by Discord ID

```js
client
.search('581442925611712513')
.then(res => console.log(res))
.catch(err => console.log(err))

//or

console.log(await client.search('581442925611712513'))

//Response: ['#P8U2J0PV2', '#88QQ99CQQ', '#PYVVYVG8P', '#9GVJ2QRYG', '#YRQPVQQY2', '#2VRVVY0RQ', '#VQJPJY0L']
```
Returns an array of player tags for the discord ID. Throws error when none is found

## Get linked discord ID from a player tag

```js
client
.search('#VQJPJY0L')
.then(res => console.log(res))
.catch(err => console.log(err))

//or

console.log(await client.search('#VQJPJY0L'))

//Response: '581442925611712513'
```
Returns a string with the discord ID linked to the player tag. Throws error when none is found.


### Wanna ask something about the API?

Contact me on [Discord](https://discord.gg/Eaja7gJ)

## Handling Errors

All errors can be taken with .catch blocks. All the errors are sent as JSON objects with message and statusCode of the error.

```js
{
message: 'Error message',
statusCode: 406
}
```

# How to access this API and use this module?

You can get your own username and password by contacting the owner of the API, **ReverendMike#6969** and by contacting us in the server: **https://discord.gg/Eaja7gJ**
