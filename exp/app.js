const express = require('express');
const app = express();
const adminRoutes = require ('./routes/admin');
const usuarioRoutes = require ('./routes/usuarios');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());
app.use((req, res, next)=>{
    console.log('Executando Middleware em nível de aplicação');
    return next();
})

app.get('/',(req, res)=>{
   // res.statusCode = 200;
    res.send('Vai Corintians');

})

app.get('/setcookie',(req, res)=>{
    res.cookie('user','Ricardo T. Bela',{maxAge:900000, httpOnly: true});
    return res.send('Cookie foi gravado com sucesso!');
})


app.get('/getcookie',(req, res)=>{
    let user = req.cookies['user'];
    if(user){
        return res.send(user);
    }
})

app.use('/admin', adminRoutes)
app.use('/usuarios', usuarioRoutes)

app.listen(3000, ()=>{
    console.log(`Server running: http://localhost:3000`);
})