import {createServer} from 'http';
const PORT = process.env.PORT;

const users = [
    {id: 1 , name: 'John Doe'},
    {id: 2 , name: 'Jihn Doe'},
    {id: 3 , name: 'Jehn Doe'}
];

//Logger middleware

const logger = (req, res, next) =>{
    console.log(`${req.method} ${req.url}`)
    next();
}

const jsonMiddleware = (req, res, next) =>{
    res.setHeader('Content-Type', 'application/json');
    next();
}

//Route handler for get /api/users
const getUsers = (req, res) =>{
    res.write(JSON.stringify(users));
    res.end(); 
}


//Route handler for get /api/users:id
const getUsersById = (req, res) =>{
    const id = req.url.split('/')[3];
    const user  = users.find(user => user.id === parseInt(id))

    if(user){
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify({user}));
        res.end();
    }else{
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 404;
        res.write(JSON.stringify({message: 'User not found'}));
    }
    res.end();
}

//Not Found
const notFound = (req, res) =>{
    res.statusCode = 404;
    res.write(JSON.stringify({message: 'User not found'}));
    res.end();
}

//Route handler for POST /api/users
const createUserHandler = (req,res) =>{
    let body = '';

    //Listen to data
    req.on('data', (chunk) =>{
        body += chunk.toString();
    });
    req.on('end', () =>{
        const newUser = JSON.parse(body);
        users.push(newUser);
        res.statusCode = 201;
        res.write(JSON.stringify(newUser));
        res.end();
    })

}

const server = createServer((req,res) => {

    logger(req,res, () =>{
    jsonMiddleware(req,res, () =>{
        if(req.url === '/api/users' && req.method === 'GET'){
            getUsers(req,res);
        }else if(req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET'){
            getUsersById(req,res);
        }else if (req.url === '/api/users' && req.method === 'POST'){
                createUserHandler(req,res);
        }
        else{
            notFound(req,res);
        }
    })

    });
});


server.listen(PORT, () =>{
    console.log(`Server connect on port number: ${PORT} `);
});