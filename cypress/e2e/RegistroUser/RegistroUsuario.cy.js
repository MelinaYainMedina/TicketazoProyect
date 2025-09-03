describe('Registro de Usuario',{testIsolation : false},() => { 
   beforeEach(() => {
        cy.visit('https://ticketazo.com.ar/auth/registerUser')

    })


it ('Happy Path', () => {

cy.get('[data-cy=input-nombres]').type('Melina Yain')
cy.get('[data-cy=input-apellido]').type('Medina')
cy.get('[data-cy=input-telefono]').type('3525565757')
cy.get('[data-cy=input-dni]').type('38676862')

cy.get('[data-cy="select-provincia"]').click();
cy.contains('Buenos Aires').click(); // Busca y hace clic en la opción 'BS'
cy.get('[data-cy="select-localidad"]').click();
cy.contains('16 de Julio').click();

//Usar un alias para el contenedor principal
cy.get('[data-cy="input-fecha-nacimiento"]').as('fechaNacimiento');
cy.get('@fechaNacimiento').find('[data-type="day"]').type('08');
cy.get('@fechaNacimiento').find('[data-type="month"]').type('09');
cy.get('@fechaNacimiento').find('[data-type="year"]').type('1993');

cy.get('[data-cy=input-email]').type('cualquiercorreo@gmail.com')
cy.get('[data-cy=input-confirmar-email]').type('cualquiercorreo@gmail.com')
cy.get('[data-cy=input-password]').type('Yain-1243')
cy.get('[data-cy=input-repetir-password]').type('Yain-1243')
//cy.get('[data-cy=btn-registrarse]').click()

})

//Casos negativos del formulario de registro
  it('Mostrar mensajes de error al enviar el formulario vacío', () => {

    cy.get('[data-cy=btn-registrarse]').click()
  
    cy.get('[data-cy="input-nombres"]').parents('[data-slot="base"]').contains('Completa este campo').should('be.visible');
    cy.get('[data-cy=input-apellido]').parents('[data-slot="base"]').contains('Completa este campo').should('be.visible');
    cy.get('[data-cy=input-telefono]').parents('[data-slot="base"]').contains('Completa este campo').should('be.visible');
    cy.get('[data-cy=input-dni]').parents('[data-slot="base"]').contains('Completa este campo').should('be.visible');
    cy.get('[data-cy="select-provincia"]').parents('[data-slot="base"]').contains('Completa este campo').should('be.visible');
    cy.get('[data-cy="select-localidad"]').parents('[data-slot="base"]').contains('Completa este campo').should('be.visible');
    cy.get('[data-cy="input-fecha-nacimiento"]').parents('[data-slot="base"]').contains('Completa este campo').should('be.visible');
    cy.get('[data-cy="input-email"]').parents('[data-slot="base"]').contains('Completa este campo').should('be.visible');
    cy.get('[data-cy="input-confirmar-email"]').parents('[data-slot="base"]').contains('Completa este campo').should('be.visible');
    cy.get('[data-cy="input-password"]').parents('[data-slot="base"]').contains('Completa este campo').should('be.visible');
    cy.get('[data-cy="input-repetir-password"]').parents('[data-slot="base"]').contains('Completa este campo').should('be.visible');

  });

  it('Mostrar un error si el teléfono no tiene 10 dígitos', () => {
    // Llenar el resto del formulario correctamente 
    cy.get('[data-cy="input-nombres"]').type('Juan');
    cy.get('[data-cy="input-apellido"]').type('Perez');
    cy.get('[data-cy="input-dni"]').type('12345678');
    
    // Ingresar un número de teléfono con menos de 10 dígitos
    cy.get('[data-cy="input-telefono"]').type('123'); 

    // Intentar enviar el formulario o forzar la validación
    cy.contains('Registrar Cuenta').click();
    
    // Validar que el mensaje de error del teléfono sea visible
    cy.get('[data-cy="input-telefono"]').parents('[data-slot="base"]').contains('Utiliza un formato que coincida con el solicitado').should('be.visible');
    
  });

 it('Mostrar un error si el DNI no tiene 8 dígitos', () => {
    // Llenar el resto del formulario
    cy.get('[data-cy="input-nombres"]').type('Ana');
    cy.get('[data-cy="input-apellido"]').type('Gómez');
    cy.get('[data-cy="input-telefono"]').type('3511234567'); 

    // Ingresar un DNI con menos de 8 dígitos
    cy.get('[data-cy="input-dni"]').type('12345');

    // Forzar la validación
    cy.contains('Registrar Cuenta').click();
    
    // Validar el mensaje de error del DNI
    cy.get('[data-cy="input-dni"]').parents('[data-slot="base"]').contains('Utiliza un formato que coincida con el solicitado').should('be.visible');
    
  });

 it('Mostrar un error si el gmail no es valido', () => {
    // Llenar el resto del formulario
    cy.get('[data-cy="input-nombres"]').type('Ana');
    cy.get('[data-cy="input-apellido"]').type('Gómez');
    cy.get('[data-cy="input-telefono"]').type('3511234567'); 
    cy.get('[data-cy=input-dni]').type('38676862')

    cy.get('[data-cy="select-provincia"]').click();
    cy.contains('Buenos Aires').click(); // Busca y hace clic en la opción 'BS'
    cy.get('[data-cy="select-localidad"]').click();
    cy.contains('16 de Julio').click();

    //Usar un alias para el contenedor principal
    cy.get('[data-cy="input-fecha-nacimiento"]').as('fechaNacimiento');
    cy.get('@fechaNacimiento').find('[data-type="day"]').type('08');
    cy.get('@fechaNacimiento').find('[data-type="month"]').type('09');
    cy.get('@fechaNacimiento').find('[data-type="year"]').type('1993');

    // Ingresar un Gmail no valido
    cy.get('[data-cy=input-email]').type('cualquieragmail.com')

    // Forzar la validación
    cy.contains('Registrar Cuenta').click();
    
    // Validar el mensaje de error del gmail
    cy.get('[data-cy=input-email]').parents('[data-slot="base"]').contains('Incluye un signo "@" en la dirección de correo electrónico. La dirección "cualquieragmail.com" no incluye el signo "@".').should('be.visible');
    
  });

 it('Mostrar un error si las contraseñas no coinciden', () => {
    // Llenar el resto del formulario
    cy.get('[data-cy="input-nombres"]').type('Ana');
    cy.get('[data-cy="input-apellido"]').type('Gómez');
    cy.get('[data-cy="input-telefono"]').type('3511234567'); 
    cy.get('[data-cy=input-dni]').type('38676862')

    cy.get('[data-cy="select-provincia"]').click();
    cy.contains('Buenos Aires').click(); // Busca y hace clic en la opción 'BS'
    cy.get('[data-cy="select-localidad"]').click();
    cy.contains('16 de Julio').click();

    //Usar un alias para el contenedor principal
    cy.get('[data-cy="input-fecha-nacimiento"]').as('fechaNacimiento');
    cy.get('@fechaNacimiento').find('[data-type="day"]').type('08');
    cy.get('@fechaNacimiento').find('[data-type="month"]').type('09');
    cy.get('@fechaNacimiento').find('[data-type="year"]').type('1993');

    cy.get('[data-cy=input-email]').type('cuakquier@gmail.com')
    cy.get('[data-cy=input-confirmar-email]').type('cuakquier@gmail.com')
      

    // Ingresar contraseñas que no coincidan
    cy.get('[data-cy=input-password]').type('carro-1244')
    cy.get('[data-cy=input-repetir-password]').type('Y12dsf-1244')  

    // Forzar la validación
    
    cy.get('[data-cy=btn-registrarse]').click()
    
    // Validar el mensaje de error 
    cy.contains('Las contraseñas no coinciden').should('be.visible');
    
  });

   it('Mostrar un error si los correos no coinciden', () => {
    // Llenar el resto del formulario
    cy.get('[data-cy="input-nombres"]').type('Ana');
    cy.get('[data-cy="input-apellido"]').type('Gómez');
    cy.get('[data-cy="input-telefono"]').type('3511234567'); 
    cy.get('[data-cy=input-dni]').type('38676862')

    cy.get('[data-cy="select-provincia"]').click();
    cy.contains('Buenos Aires').click(); // Busca y hace clic en la opción 'BS'
    cy.get('[data-cy="select-localidad"]').click();
    cy.contains('16 de Julio').click();

    //Usar un alias para el contenedor principal
    cy.get('[data-cy="input-fecha-nacimiento"]').as('fechaNacimiento');
    cy.get('@fechaNacimiento').find('[data-type="day"]').type('08');
    cy.get('@fechaNacimiento').find('[data-type="month"]').type('09');
    cy.get('@fechaNacimiento').find('[data-type="year"]').type('1993');

    // Ingresar correos que no coincidan
    cy.get('[data-cy=input-email]').type('cuakquier@gmail.com')
    cy.get('[data-cy=input-confirmar-email]').type('cuakquieraaa@gmail.com')
    cy.get('[data-cy=input-password]').type('Yain-1244')
    cy.get('[data-cy=input-repetir-password]').type('Yain-1244')
      

    // Forzar la validación
    
    cy.get('[data-cy=btn-registrarse]').click()
    
    // Validar el mensaje de error 
    cy.contains('Los correos electrónicos no coinciden').should('be.visible');
    
  });
  

})

