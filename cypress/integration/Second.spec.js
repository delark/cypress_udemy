/// <reference types="cypress" />
describe('First test suite', () => {
	it('Attributes with or not values as locators', () => {
		cy.visit('/')
		cy.contains('Forms').click()
		cy.contains('Form Layouts').click()

		//by Tag name
		cy.get('input')

		//by ID
		cy.get('#inputEmail')

		//by Class name
		cy.get('.input-full-width')

		//by Attribute name = placeholder="Email"
		cy.get('[placeholder]')

		//by Attribute name and value
		cy.get('[placeholder="Email"]')

		//by Class value
		cy.get('[class="input-full-width size-medium shape-rectangle"]')

		//by Tag name and Attibute with value
		cy.get('input[placeholder="Email"]')

		//by two different attributes
		cy.get('[placeholder="Email"][fullwidth]')

		//by tag name, Attribute with value, ID and Class name
		cy.get('input[placeholder="Email"]#inputEmail.input-full-width')

		//The most recommended way by Cypress is create our own locators = <input _ngcontent-tyx-c19 data-cy="imputEmail1"
		cy.get('[data-cy="imputEmail1"]')
	})

	it('Use Parents and Find when target not have valid attributes', () => {
		cy.visit('/')
		cy.contains('Forms').click()
		cy.contains('Form Layouts').click()

		cy.contains('[status="warning"]', 'Sign in')

		cy.get('#inputEmail3')
			.parents('form')
			.find('button')
			.should('contain', 'Sign in')
			.parents('form')
			.find('nb-checkbox')
			.click()

		cy.contains('nb-card', 'Horizontal form')
			.find('[type="email"]')
			.type('algo_nuevo')
	})

	it('Then and Wrap', () => {
		cy.visit('/')
		cy.contains('Forms').click()
		cy.contains('Form Layouts').click()

		cy.contains('nb-card', 'Using the Grid')
			.find('[for="inputEmail1"]')
			.should('contain', 'Email')
		cy.contains('nb-card', 'Using the Grid')
			.find('[for="inputPassword2"]')
			.should('contain', 'Password')

		cy.contains('nb-card', 'Basic form')
			.find('[for="exampleInputEmail1"]')
			.should('contain', 'Email address')
		cy.contains('nb-card', 'Basic form')
			.find('[for="exampleInputPassword1"]')
			.should('contain', 'Password')

		//Escribir la funcion en terminos de JQuery
		cy.contains('nb-card', 'Using the Grid').then(firstForm => {
			const emailLaberFirst = firstForm.find('[for="inputEmail1"]').text()
			const passwordLaberFirst = firstForm.find('[for="inputPassword2"]').text()
			expect(emailLaberFirst).to.equal('Email')
			expect(passwordLaberFirst).to.equal('Password')

			cy.contains('nb-card', 'Basic form').then(secondForm => {
				//
				//Escribir la funcion en terminos de JQuery
				const passwordSecondText = secondForm
					.find('[for="exampleInputPassword1"]')
					.text()
				expect(passwordLaberFirst).to.equal(passwordSecondText)

				//Escribir la funcion en terminos de Cypress
				cy.wrap(secondForm)
					.find('[for="exampleInputPassword1"]')
					.should('contain', 'Password')
			})
		})
	})

	it('invoke command', () => {
		cy.visit('/')
		cy.contains('Forms').click()
		cy.contains('Form Layouts').click()

		//Examples
		//1
		cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

		//2 label y text (es un metodo) son elementos de JQuery
		cy.get('[for="exampleInputEmail1"]').then(label => {
			expect(label.text()).to.equal('Email address')
		})

		//3 invoke es un metodo de Cypress al cual se envia como parametro text guarda al elemento que busca get
		cy.get('[for="exampleInputEmail1"]')
			.invoke('text')
			.then(text => {
				expect(text).to.equal('Email address')
			})

		//4 Primera forma de comprobar el check
		cy.contains('nb-card', 'Basic form')
			.find('nb-checkbox')
			.click()
			.find('.custom-checkbox')
			.invoke('attr', 'class')
			.should('contain', 'checked')

		cy.contains('nb-card', 'Basic form').find('nb-checkbox').click()

		//4 Segunda forma de comprobar el check
		cy.contains('nb-card', 'Basic form')
			.find('nb-checkbox')
			.click()
			.find('.custom-checkbox')
			.invoke('attr', 'class')
			//.should('contain', 'checked')
			.then(classValue => {
				expect(classValue).to.contain('checked')
			})
	})

	it('assert property datepicker, invoque properties of the web elements select any day', () => {
		cy.visit('/')
		cy.contains('Forms').click()
		cy.contains('Datepicker').click()

		cy.contains('nb-card', 'Common Datepicker')
			.find('input')
			.then(input => {
				cy.wrap(input).click()
				cy.get('nb-calendar-day-picker').contains('20').click()
				cy.wrap(input).invoke('prop', 'value').should('contain', 'Apr 20, 2020')
			})
	})

	///////////////////////////////////////////////////////////////////////////////////////////////

	it('assert property datepicker', () => {
		cy.visit('/')
		cy.contains('Forms').click()
		cy.contains('Datepicker').click()

		let date = new Date()
		date.setDate(date.getDate() + 5)
		let futureDay = date.getDate()
		let futureMonth = date.toLocaleString('default', { month: 'short' })

		cy.contains('nb-card', 'Common Datepicker')
			.find('input')
			.then(input => {
				cy.wrap(input).click()

				cy.get('nb-calendar-navigation')
					.invoke('attr', 'ng-reflect-date')
					.then(dateAttribute => {
						if (!dateAttribute.includes(futureMonth)) {
							cy.get('[data-name="chevron-right"]').click()
							cy.get(
								'nb-calendar-day-picker [class="day-cell ng-star-inserted"]'
							)
								.contains(futureDay)
								.click()
						} else {
							cy.get(
								'nb-calendar-day-picker [class="day-cell ng-star-inserted"]'
							)
								.contains(futureDay)
								.click()
						}
					})
			})
	})

	it('datepicker pruebas de codigo', () => {
		cy.visit('/')
		cy.contains('Forms').click()
		cy.contains('Datepicker').click()

		let date = new Date()
		date.setDate(date.getDate() + 5)
		let futureDay = date.getDate()
		console.log(futureDay)
		let futureMonth = date.toLocaleString('default', { month: 'short' })
		let dateAssert = futureMonth + ' ' + futureDay + ', ' + date.getFullYear()

		cy.contains('nb-card', 'Common Datepicker')
			.find('input')
			.then(input => {
				cy.wrap(input).click()

				selectDayFromCurrent()
				function selectDayFromCurrent() {
					cy.get('nb-calendar-navigation')
						.invoke('attr', 'ng-reflect-date')
						.then(dateAttribute => {
							if (!dateAttribute.includes(futureMonth)) {
								cy.get('[data-name="chevron-right"]').click()
								selectDayFromCurrent()
							} else {
								cy.get(
									'nb-calendar-day-picker [class="day-cell ng-star-inserted"]'
								)
									.contains(futureDay)
									.click()
							}
						})
				}
				cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
			})
	})

	it.only('assert property datepicker', () => {
		cy.visit('/')
		cy.contains('Forms').click()
		cy.contains('Datepicker').click()

		let date = new Date()
		date.setDate(date.getDate() + 13)
		let futureDay = date.getDate()
		let futureMonth = date.toLocaleString('default', { month: 'short' })
		let dateAssert = futureMonth + ' ' + futureDay + ', ' + date.getFullYear()

		cy.contains('nb-card', 'Common Datepicker')
			.find('input')
			.then(input => {
				cy.wrap(input).click()

				selectDayFromCurrent()
				function selectDayFromCurrent() {
					cy.get('nb-calendar-navigation')
						.invoke('attr', 'ng-reflect-date')
						.then(dateAttribute => {
							if (!dateAttribute.includes(futureMonth)) {
								cy.get('[data-name="chevron-right"]').click()
								selectDayFromCurrent()
							} else {
								cy.get(
									'nb-calendar-day-picker [class="day-cell ng-star-inserted"]'
								)
									.contains(futureDay)
									.click()
							}
						})
				}

				cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
			})
	})

	///////////////////////////////////////////////////////////////////////////////////////////////

	it('radio button', () => {
		cy.visit('/')
		cy.contains('Forms').click()
		cy.contains('Form Layouts').click()

		cy.contains('nb-card', 'Using the Grid')
			.find('[type="radio"]')
			.then(radioButtons => {
				cy.wrap(radioButtons)
					.first()
					.check({ force: true })
					.should('be.checked')

				cy.wrap(radioButtons).eq(1).check({ force: true })

				cy.wrap(radioButtons).first().should('not.be.checked')

				cy.wrap(radioButtons).eq(2).should('be.disabled')
			})
	})

	it('check boxes', () => {
		cy.visit('/')
		cy.contains('Modal & Overlays').click()
		cy.contains('Toastr').click()

		//El metodo check solo funciona para elementos checkbox y radio button de tipo <input>
		//cy.get('[type="checkbox"]').check({ force: true })

		//Click quita el check
		cy.get('[type="checkbox"]').eq(0).click({ force: true })
		//Check pone el check
		cy.get('[type="checkbox"]').eq(1).check({ force: true })
	})

	it('lists and dropdowns using loop to test all options', () => {
		cy.visit('/')
		//1
		/* cy.get('nav nb-select').click()
		cy.get('.options-list').contains('Dark').click()
		cy.get('nav nb-select').should('contain', 'Dark')
		cy.get('nb-layout-header nav').should(
			'have.css',
			'background-color',
			'rgb(34, 43, 69)'
		) */

		//2
		cy.get('nav nb-select').then(dropdown => {
			cy.wrap(dropdown).click()
			cy.get('.options-list nb-option').each((listItem, index) => {
				const itemText = listItem.text().trim()

				const colors = {
					Light: 'rgb(255, 255, 255)',
					Dark: 'rgb(34, 43, 69)',
					Cosmic: 'rgb(50, 50, 89)',
					Corporate: 'rgb(255, 255, 255)',
				}

				cy.wrap(listItem).click()
				cy.wrap(dropdown).should('contain', itemText)
				cy.get('nb-layout-header nav').should(
					'have.css',
					'background-color',
					colors[itemText]
				)
				if (index < 3) {
					cy.wrap(dropdown).click()
				}
			})
		})
	})

	it('Web tables', () => {
		cy.visit('/')
		cy.contains('Tables & Data').click()
		cy.contains('Smart Table').click()

		//1
		cy.get('tbody')
			.contains('tr', 'Larry')
			.then(tableRow => {
				cy.wrap(tableRow).find('.nb-edit').click()
				cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
				cy.wrap(tableRow).find('.nb-checkmark').click()
				//SI NO HAY LOCATORS USABLES SE PUEDE UBICAR EL OBJETIVO POR COLUMNAS <td QUE SERIA LA SEXTA INICIANDO EN CERO
				//<tr <td actions <td ID <td firstName <td lastName <td userName <td email <td age
				cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
			})

		//2
		cy.get('thead').find('.nb-plus').click()
		cy.get('thead')
			.find('tr')
			.eq(2)
			.then(tableRow => {
				cy.wrap(tableRow).find('[placeholder="First Name"]').type('Andres')
				cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Mera')
				cy.wrap(tableRow).find('.nb-checkmark').click()
			})

		cy.get('tbody tr')
			.first()
			.find('td')
			.then(tableColumns => {
				cy.wrap(tableColumns).eq(2).should('contain', 'Andres')
				cy.wrap(tableColumns).eq(3).should('contain', 'Mera')
			})

		//3
		const age = [20, 30, 40, 200]
		cy.wrap(age).each(age => {
			cy.get('thead [placeholder="Age"]').clear().type(age)
			cy.wait(500)
			cy.get('tbody tr').each(tableRow => {
				if (age == 200) {
					cy.wrap(tableRow).should('contain', 'No data found')
				} else {
					cy.wrap(tableRow).find('td').eq(6).should('contain', age)
				}
			})
		})
	})
})

//Crear una carpeta en local que contendra el proyecto a clonar
//git init
//git remote add origin https://github.com/delark/cypress_test_udemy.git
//git pull origin master
//COPIAR TODO EL CONTENIDO DE LA CARPETA DEL PROYECTO CLONADO incluyendo archivos .algo como .gitignore o .prettierrc ya que son de configuracion
//git add .
//git commit -m "agregar proyecto Udemy Zero to Hero attribute and datepicker"
//git push origin master
