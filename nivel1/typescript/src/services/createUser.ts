interface objectLanguage {
  title: string;
  description: string;
  types: string[];
}

interface objectTech {
  tech: string;
  creator: string;
  year: number;
}

interface createUser {
  name?: string;
  email: string;
  password: string | number
  techs: Array<string | objectLanguage | objectTech>
}


export default function CreateUser({ name="", email, password,techs }: createUser){

  const user = {
    name,
    email,
    password,
    techs,
  }

  return user;
}
