import {user,User} from '../users'

const use = new User();

describe("product Model", () => {

    it('should have an index method', () => {
        expect(use.index).toBeDefined();
      });

      it('should have an show method', () => {
        expect(use.show).toBeDefined();
      });

});
