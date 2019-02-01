import { browser, by, element } from 'protractor';

export class SignInPage {
    navigateTo(){
        return browser.get('/auth/signin');
    }

    getEmailTextbox() {
        return element(by.name('email'));
    }
    
    getPasswordTextbox() {
        return element(by.name('password'));
    }

    getForm() {
        return element(by.name("signInForm"));
    }

    getTitle() {
        return element(by.name("signInTitle"));
    }
}