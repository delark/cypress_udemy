/// <reference types="cypress" />

describe('Third test suite', () => {
	it('tooltip', () => {
		cy.visit('/')
		cy.contains('Modal & Overlays').click()
		cy.contains('Tooltip').click()

		cy.contains('nb-card', 'Colored Tooltips').contains('Default').click()
		cy.get('nb-tooltip').should('contain', 'This is a tooltip')
	})

	it.only('**dialog box with component**', () => {
		cy.visit('/')
		cy.contains('Modal & Overlays').click()
		cy.contains('Dialog').click()

		cy.contains('nb-card', 'Open Dialog')
			.contains('Open Dialog with component')
			.click()

		cy.get('nb-card').should(
			'contain',
			'This is a title passed to the dialog component'
		)

		cy.contains('nb-card', 'This is a title passed to the dialog component')
			.should(
				'contain',
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
			)
			.find('button')
			.click()
	})

	it('browser dialog box', () => {
		cy.visit('/')
		cy.contains('Tables & Data').click()
		cy.contains('Smart Table').click()

		//CYPRESS POR DEFECTO A LAS VENTANAS EMERGENTES DEL NAVEGADOR VA A RESPONDER SI/OK

		//1 NO SE SABE CUANDO FALLA LA PRUEBA YA QUE CON SOLO SALIR LA VENTANA (window:confirm) ES POSITIVA LA PRUEBA
		// cy.get('tbody tr').first().find('.nb-trash').click()
		// cy.on('window:confirm', confirm => {
		// 	expect(confirm).to.equal('Are you sure you want to delete?')
		// })

		//2 CON ESTE METODO SE PUEDE CONFIRMAR QUE SI NO SALE LA VENTANA (window:confirm) LA PRUEBA NO PASARA YA QUE NO PODRA RETORNAR EL MENSAJE QUE DEBE MOSTRAR LA VENTANA
		// const stub = cy.stub()
		// cy.on('window:confirm', stub)
		// cy.get('tbody tr')
		// 	.first()
		// 	.find('.nb-trash')
		// 	.click()
		// 	.then(() => {
		// 		expect(stub.getCall(0)).to.be.calledWith(
		// 			'Are you sure you want to delete?'
		// 		)
		// 	})

		//comentario de prueba

		//3 HACER QUE CYPRESS RESPONDA NO A LA VENTANA DEL NAVEGADOR
		cy.get('tbody tr').first().find('.nb-trash').click()
		cy.on('window:confirm', () => false)
	})
})
