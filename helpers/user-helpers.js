var db = require('../config/connection')
var collections = require('../config/collections')
var bcrypt = require('bcrypt')
module.exports = {
    doSignup: (userdata) => {
        return new Promise(async (resolve, reject) => {
            userdata.password = await bcrypt.hash(userdata.password, 10)
            db.get().collection(collections.USER_COLLECTION).insertOne(userdata).then((data) => {
                console.log(data)
                resolve(data.acknowledged)

            })
        })


    },
    doLogin: (data) => {
        return new Promise(async (resolve, reject) => {
            let loginstatus = false
            let response = {}
            let user = await db.get().collection(collections.USER_COLLECTION).findOne({ email: data.email })
            if (user) {
                
                bcrypt.compare(data.password,user.password).then((status) => {
                    if (status) {
                        response.status=true
                        response.user=user
                        resolve(response)
                    } else {
                        resolve({status:false})
                    }


                })

            }else{
                resolve({status:false})
            }


        })
    }


}
