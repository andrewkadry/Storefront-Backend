import {user,User} from '../users'

const use = new User();

describe("users Model", () => {

    it('should have an index method', () => {
        expect(use.index).toBeDefined();
      });

      it('should have an show method', () => {
        expect(use.show).toBeDefined();
      });

      it('create method should add a user', async () => {
        const result = await use.create({
          id: 2,
          username: "andrewtest",
          firstname: "andrew",
          lastname: "wagih",
          password: "testpassword"
        });
        expect(result).toEqual({
          id: jasmine.any(Number),
          username: "andrewtest",
          firstname: "andrew",
          lastname: "wagih",
          password: jasmine.any(String)
        });
      });

      it('create method should authenticate', async () => {
        const result = await use.authenticate(
          "andrewtest",
          "testpassword"
        );
        expect(result).toEqual({
          id: jasmine.any(Number),
          username: "andrewtest",
          firstname: "andrew",
          lastname: "wagih",
          password: jasmine.any(String)
        });
      });

});
