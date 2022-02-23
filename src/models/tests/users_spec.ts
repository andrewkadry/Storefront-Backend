import {user,User} from '../users'

const use = new User();
let userID : number;

describe("users Model", () => {

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
        userID = result.id;
      });

      it('authenticate method should authenticate', async () => {
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

      it('show method should show user by id', async () => {
        const result = await use.show(userID);
        expect(result).toEqual({
          id: userID,
          username: "andrewtest",
          firstname: "andrew",
          lastname: "wagih",
          password: jasmine.any(String)
        });
      });

      it('index method should get all users from database', async () => {
        const result = await use.index();
        expect(result).toEqual([{
          id: 1,
          username: "andrewKadry",
          firstname: "Andrew",
          lastname: "Kadry",
          password: jasmine.any(String)
        },{
          id: 2,
          username: "andrewOrder",
          firstname: "andrew",
          lastname: "wagih",
          password: jasmine.any(String)
        },{
          id: userID,
          username: "andrewtest",
          firstname: "andrew",
          lastname: "wagih",
          password: jasmine.any(String)
        }]);
      });

});
