const Role = require('../models/role');

const createRole = async() => {
    try{
        
        //Model Document
        const count = await Role.estimatedDocumentCount();
        if(count > 0) return;

        //Create Roles
        const values = await Promise.all([
            new Role({name: 'user'}).save(),
            new Role({name: 'admin'}).save()
        ])
        
    }catch(error){console.log(error)}
}

module.exports = createRole;