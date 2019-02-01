import { SignInPage } from './sign-in.po';
import { s } from '@angular/core/src/render3';

describe('Login tests', () => {
    let page: SignInPage;

    beforeEach(() => {
        page = new SignInPage();
        page.navigateTo();
    });

    it('Login page should be defined', () => {
        expect(page).toBeDefined();
    });

    it('Login title should be defined', () => {
        expect(page.getTitle()).toBeDefined();
    });

    it('Login form should be valid', () => {
        page.getEmailTextbox().sendKeys('info@sibeeshpassion.com');
       
        page.getPasswordTextbox().sendKeys('1234');
       
        let form = page.getForm().getAttribute('class');
       
        expect(form).toContain('ng-valid');
    });

});