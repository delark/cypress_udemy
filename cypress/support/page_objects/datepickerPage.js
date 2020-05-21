//Esta función permite ubicar el dia y mes a futuro segun el parametro que se recibe
function selectDayFromCurrent(day) {
	let date = new Date()
	date.setDate(date.getDate() + day)
	let futureDay = date.getDate()
	let futureMonth = date.toLocaleString('en-us', { month: 'short' })
	let dateAssert = futureMonth + ' ' + futureDay + ', ' + date.getFullYear()
	//console.log(date)	console.log(futureDay)	console.log(futureMonth)

	//Esta funcion permite pasar de mes hasta llegar al dia que se espera
	cy.get('nb-calendar-navigation')
		.invoke('attr', 'ng-reflect-date')
		.then(dateAttribute => {
			if (!dateAttribute.includes(futureMonth)) {
				cy.get('[data-name="chevron-right"]').click()
				selectDayFromCurrent(day)
			} else {
				//cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
				//
				cy.get('day-cell').not('.bounding-month').contains(futureDay).click()
			}
		})
	return dateAssert
}

export class DatepickerPage {
	//
	selectCommonDatepickerDateFromToday(dayFromToday) {
		//
		cy.contains('nb-card', 'Common Datepicker')
			.find('input')
			.then(input => {
				cy.wrap(input).click()
				let dateAssert = selectDayFromCurrent(dayFromToday) //Se llama a la funcion enviando el valor del paramtero (day) que se ingreso en testWithPageObejects.js
				cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
				//cy.wrap(input).should('have.value', dateAssert)
			})
	}

	selectDatepickerWithRangeFromToday(firstDay, secondDay) {
		cy.contains('nb-card', 'Datepicker With Range')
			.find('input')
			.then(input => {
				cy.wrap(input).click()
				let dateAssertFirst = selectDayFromCurrent(firstDay) //LLamado a la funcion que ubica el dia en el calendario y se envia el parametro de dias a calcular
				let dateAssertSecond = selectDayFromCurrent(secondDay)
				const finalDate = dateAssertFirst + ' - ' + dateAssertSecond
				cy.wrap(input).invoke('prop', 'value').should('contain', finalDate)
				cy.wrap(input).should('have.value', finalDate)
			})
	}
}

export const onDatepickerPage = new DatepickerPage()
