import { boolean } from "joi"

Cypress.Commands.add('token', (email, senha) => {
    cy.request({
        method: 'POST',
        url: 'login',
        body: {
            "email": email,
            "password": senha 
        }
    }).then((response) => {
        expect(response.status).to.equal(200)
        return response.body.authorization
    })
 })

 Cypress.Commands.add('cadastrarProduto' , (token, produto, preco, descricao, quantidade) =>{
    cy.request({
        method: 'POST', 
        url: 'produtos',
        headers: {authorization: token}, 
        body: {
            "nome": produto,
            "preco": preco,
            "descricao": descricao,
            "quantidade": quantidade
          }, 
          failOnStatusCode: false
    })
 })

 Cypress.Commands.add('cadastrarUsuario',(usuario,email,senha,boolean) =>{
    cy.request({
        method:'POST',
        url:'usuarios',
        body:{
        "nome": usuario,
        "email": email,
        "password": senha,
        "administrador": boolean
       
         },failOnStatusCode: false
        })
    })

    Cypress.Commands.add('listaUsuariosCadastrados',() =>{
        cy.request({
            method:'GET',
            url:'usuarios'
          })

        })
       