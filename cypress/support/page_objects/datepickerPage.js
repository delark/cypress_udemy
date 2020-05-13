//Esta función permite ubicar el dia y mes a futuro segun el parametro que se recibe
function selectDayFromCurrent(day) {
	let date = new Date()
	date.setDate(date.getDate() + day)
	let futureDay = date.getDate()
	let futureMonth = date.toLocaleString('en-us', { month: 'short' })
	let dateAssert = futureMonth + ' ' + futureDay + ', ' + date.getFullYear()

	//Esta funcion permite pasar el mes hasta llegar al dia que se espera
	cy.get('nb-calendar-navigation')
		.invoke('attr', 'ng-reflect-date')
		.then(dateAttribute => {
			if (!dateAttribute.includes(futureMonth)) {
				cy.get('[data-name="chevron-right"]').click()
				selectDayFromCurrent()
			} else {
				cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]')
					.contains(futureDay)
					.click()
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
				//LLamado a la funcion que ubica el dia en el calendario y se envia el parametro de dias a calcular
				let dateAssert = selectDayFromCurrent(dayFromToday)
				cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
			})
	}
}

export const onDatepickerPage = new DatepickerPage()
