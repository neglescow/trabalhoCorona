const faker = require('faker')
faker.locale = 'pt_BR'

exports.geraInfectado = function(){
    let peso, altura, idade, nome, endereco, tel, prob_saude, doenca, obesidade, idoso
    
    doenca = [
        "nenhum",
        "diabetes",
        "asma",
        "hipertensão",
        "lúpus",
        "câncer",
        "sinusite",
        "bronquite"
    ] 
    nome = faker.name.findName()
    endereco = faker.address.city()
    tel = faker.phone.phoneNumber()
    idade = faker.random.number({min:0, max:110})
    prob_saude = doenca[Math.floor(Math.random()*doenca.length)]
    
    if(idade >= 0 && idade <= 10){
        altura = faker.random.number({min:90, max:150})
        peso = faker.random.number({min:10, max:80})
        peso >= 70 ? obesidade = true : obesidade = false
    }else if(idade >= 11 && idade <= 21){
        altura = faker.random.number({min:120, max:220})
        peso = faker.random.number({min:50, max:140})
        peso >= 90 ? obesidade = true : obesidade = false
    }else if(idade >= 22 && idade <= 40){
        altura = faker.random.number({min:130, max:200})
        peso = faker.random.number({min:70, max:130})
        peso >= 100 ? obesidade = true : obesidade = false
    }else if(idade >= 41 && idade <= 65){
        altura = faker.random.number({min:130, max:180})
        peso = faker.random.number({min:60, max:150})
        peso >= 80 ? obesidade = true : obesidade = false
    }else if(idade >= 66 && idade <= 90){
        altura = faker.random.number({min:120, max:170})
        peso = faker.random.number({min:50, max:100})
        peso >= 75 ? obesidade = true : obesidade = false
    }else if(idade >= 91 && idade <= 110){
        altura = faker.random.number({min:90, max:140})
        peso = faker.random.number({min:70, max:110})
        peso >= 70 ? obesidade = true : obesidade = false
    }
    
    idade >= 50 ? idoso = "sim" : idoso = "não"
    obesidade ? obesidade = "sim" : obesidade = "não"
    return {peso, altura, idade, nome, endereco, tel, prob_saude, obesidade, idoso}
}