const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

jest.dontMock('fs');

describe('webpage', function () {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });

    afterEach(() => {
        jest.resetModules();
    });

    it('button exists', function () {
        expect(document.getElementById('xmas-msg-prefix').textContent).toEqual("Chrismas begins in");
    });
});