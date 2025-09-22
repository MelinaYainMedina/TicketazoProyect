describe('Clase de APIs en Cypress', () => {


  //it.skip es para que no se ejecute el it 
  it.skip('Clase de API', () => {
    //para que me de un nombre de usuario aleatorio asi no me da error que ya esta registrado el usuario
    const numeroaleatorio = Math.floor(Math.random() * 1000)

    cy.intercept('POST', 'api/users').as('UsuarioCreado')

    cy.visit('https://conduit.bondaracademy.com/');
    cy.contains(/sign up/i).click() //la i es para omitir (ignorame) mayusculas
    cy.get('[placeholder="Username"]').type(`Melina${numeroaleatorio}Enriquez`)
    cy.get('[placeholder="Email"]').type('melinaya@gmail.com')
    cy.get('[placeholder="Password"]').type('meliinyain')
    cy.get('.btn').click()

    cy.wait('@UsuarioCreado').then((interception) => {
      expect(
        interception.response.statusCode).to.equals(201)

      expect(
        interception.response.body.user).to.have.property('email', 'melinaya@gmail.com')


    })

  });

  it('Mock', () => {
    //para que me de un nombre de usuario aleatorio asi no me da error que ya esta registrado el usuario
    const numeroaleatorio = Math.floor(Math.random() * 1000)

    cy.intercept('GET', '/api/articles*',
      {
        //traeme los articulos y modificame estos datos
        "articles": [
        {
           "title": "Nuevo titulo agregado",
          "description": "Una descripcionnn",
          "favoritesCount": 1000,
          "tagList": [
                "El codigo trae lo que yo le digo",
                "estos son los datoas que agregue",
                "QA Melina",
                "2025"
            ],
      }],

      "articlesCount": 10

    }



    ).as('ArticulosdeHoy')

    cy.visit('https://conduit.bondaracademy.com/');
    


  });

})
