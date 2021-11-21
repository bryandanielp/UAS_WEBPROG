const mongoose = require ('mongoose');
const Product = require ('../models/product');

mongoose.connect('mongodb+srv://root:dhyD9SDOsTVc2JcY@cluster0.imabx.mongodb.net/demo?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const allproducts = [
    new Product({
        imagePath: "https://images.unsplash.com/photo-1625645758520-69e4db363b8d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=871&q=80",
        name: 'PS4 SLIM 500GB',
        price: 3000000
    }),
    new Product({
        imagePath: "https://images.unsplash.com/photo-1544652478-6653e09f18a2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
        name: 'KEYBOARD RGB',
        price: 1500000
    }),
    new Product({
        imagePath: "https://images.unsplash.com/photo-1616196395385-2587a28072eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        name: 'NINTENDO SWITCH V1',
        price: 3000000
    }),
    new Product({
        imagePath: "https://images.unsplash.com/photo-1616341316676-fb436b96f99a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
        name: 'STICK PS4 JETBLACK',
        price: 250000
    }),
    new Product ({
        imagePath: "https://images.unsplash.com/photo-1552346154-21d32810aba3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c25lYWtlcnN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
        name: 'Socks',
        price: 229999
    })
];

var done = 0;
for(var i=0; i<allproducts.length; i++) {
    allproducts[i].save(function (err,result) {
        done++;
        if(done === allproducts.length){
            console.log('saved');
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
};