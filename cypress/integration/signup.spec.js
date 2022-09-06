// import SignupPage from '../pages/SignupPage'
import signup from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'
// import { it } from 'faker/lib/locales'

describe('Signup', () => {
    // beforeEach(function () {
    //     cy.fixture('deliver').then((d) => {
    //         // d pode ser qualquer valor, será o nome da var apenas
    //         // this criar uma variável de contexto, armazenando em uma variável no js de cadastro, tendo acesso as infos de deliver.json
    //         this.deliver = d
    //     })
    // })

    it('User should be deliver', function () {

        var deliver = signupFactory.deliver()

        signup.go()
        signup.fillForm(deliver)
        signup.submit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)
    })

    it('Incorrect Document', function () {

        var deliver = signupFactory.deliver()

        deliver.cpf = '000000141aa'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        // cy.get('.alert-error').should('have.text', 'Oops! CPF inválido')
        // signup.modalContentShouldBe(expectedMessage)

        // Fazendo o mesmo so que mais curto, declarando o texto desejado no objeto
        signup.alertMessageShouldBe('Oops! CPF inválido')
    })

    it('Incorrect Email', function () {

        var deliver = signupFactory.deliver()

        deliver.email = 'papito.com.br'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! Email com formato inválido.')
    })

    context('Required Fields', function () {
        // array messages
        const messages = [
            // Objeto e seu output
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' },
        ]
        before(function () {
            signup.go()
            signup.submit()
        })
        messages.forEach(function (msg) {
            it(`${msg.field} is required`, function () {
                signup.alertMessageShouldBe(msg.output)
            })
        })
    })
 })