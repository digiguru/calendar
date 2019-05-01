import {Resource} from './users';

describe('The Users', () => {
    it('Can be created with a name and a capacity', () => {
        const user = new Resource('Adam Hall',1);
        expect(user.name).toBe('Adam Hall');
        expect(user.capacity).toBe(1);
    });  
});

