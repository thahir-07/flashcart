const MongoClient=require('mongodb').MongoClient
const state={
    db:null
}
module.exports={ connect,get}
function connect(done){
    const url="mongodb://localhost:27017"
    const dbname="ecommerce"
    
    MongoClient.connect(url,function(err,data){
        if(err )
            return done(err)
        else{
        state.db=data.db(dbname)
            done(data)
        }
         })

}
function get(){
    return state.db
}