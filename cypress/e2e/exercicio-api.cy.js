/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'
import { faker } from '@faker-js/faker';

describe('Testes da Funcionalidade Usuários', () => {
  let token
  before(() => {
      cy.token('Alena.Turcotte24@gmail.com', 'teste').then(tkn => { token = tkn })
  });

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response=>{
      return contrato.validateAsync(response.body)
    })
  });

  it('Deve listar usuários cadastrados', () => {
    cy.listaUsuariosCadastrados()
    .then((response)=>{
      expect(response.status).to.equal(200)
      expect(response.body).to.have.property('usuarios')
      })
    })
  

  it('Deve cadastrar um usuário com sucesso', () => {
   cy.cadastrarUsuario(faker.person.firstName(),faker.internet.email(),"teste","true")
    .then((response)=>{
    expect(response.status).to.equal(201)
    expect(response.body.message).to.equal('Cadastro realizado com sucesso')
    
    })
  });

  it('Deve validar um usuário com email inválido', () => {
    cy.cadastrarUsuario("Jéssica","beltrano@qa.com.br","teste","true")
    .then((response)=>{
      expect(response.status).to.equal(400)
      expect(response.body.message).to.equal("Este email já está sendo usado")
      
      })
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    cy.request('usuarios').then(response => {
      let id = response.body.usuarios[0]._id
        cy.request({
            method:'PUT',
            url: `usuarios/${id}`,
             
            body:{
              "nome":faker.person.firstName(),
              "email": faker.internet.email(),
              "password": "teste",
              "administrador":"true"
            }
          })
      }).then(response => {
          expect(response.body.message).to.equal('Registro alterado com sucesso')
          expect(response.status).to.equal(200)
      })
  })
  it('Deve deletar um usuário previamente cadastrado', () => {
    cy.request('usuarios').then(response => {
      let id = response.body.usuarios[0]._id
        cy.request({
            method:'DELETE',
            url: `usuarios/${id}`,
  }).then(response =>{
    expect(response.body.message).to.equal('Registro excluído com sucesso')
    expect(response.status).to.equal(200)
    
        })
    })
 })
 
})
//'Alena.Turcotte24@gmail.com