import { navigateTo } from '../support/page_objects/navigationPage'
import { onFormLayoutsPage } from '../support/page_objects/formLayoutsPage'
import { onDatepickerPage } from '../support/page_objects/datepickerPage'

describe('Test with Page Objects', () => {
	//
	beforeEach('open application', () => {
		cy.visit('/')
	})

	it('verify navigations across the pages', () => {
		navigateTo.formLayoutsPage()
		navigateTo.datepickerPage()
		navigateTo.toasterPage()
		navigateTo.smartTablePage()
		navigateTo.tooltipPage()
	})

	it.only('show submit Inline and Basic form and select tomorrow date in the calendar', () => {
		navigateTo.formLayoutsPage()
		onFormLayoutsPage.submitInlineFormWithNameAndEmail('Artem', 'test@test.com')
		onFormLayoutsPage.submitBasicFormWithEmailAndPassword(
			'test@test.com',
			'password'
		)
		navigateTo.datepickerPage()
		onDatepickerPage.selectCommonDatepickerDateFromToday(1)
	})
})
