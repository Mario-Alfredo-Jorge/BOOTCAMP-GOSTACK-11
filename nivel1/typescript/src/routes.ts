import { Request, Response } from 'express'
import CreateUser from './services/createUser'

export function HelloWorld(req: Request, res: Response) {

  const user = CreateUser({
    name: "Mario",
    email: 'mariojorge19997@outlook.com',
    password: '123456789098765432',
    techs: ['Reactjs', 'Nodejs', 'MongoDB', 'Git', 'Firebase', 
      {
        title: 'Languages',
        description: 'For web',
        types: ['JavaScript', 'TypeScript'],
      }, 
      {
        tech: 'Typescript',
        creator: 'Microsoft',
        year: 2012
      }, 
      {
        tech: 'Firebase',
        creator: 'Google',
        year: 2012
      }
    ]
  });
  return res.json({ msg: `Move route into file of routes and add types, ${user.techs}` });
};