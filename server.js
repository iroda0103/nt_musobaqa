const express=require('./express')
// const app=new express()
// app.listen(3000,()=>{
//     console.log('Server ishladi');
// })
const express1 = new express()
express1.use((req, res) => {
    console.log('use ishladi');
})
express1.get('/:id/book/:count/ll', (req, res) => {
    const { content, xayr, son } = req.body
    console.log(req.headers['aa'], 'header', req.header('aa'), 'sss')
    // res.status(303).json([{ sas: "s" }])
    // res.sendFile( 'kk/index.txt'))
    // res.json([{ sas: "s" }])
    // res.sendFile('kk/index.txt')
    res.json([{ sas: "s" }])
    // res.send('<h1>dsdsd</h1>')
})

express1.listen(3000, () => {
    console.log('server boshlandi');
})