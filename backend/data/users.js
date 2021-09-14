import bcrypt from 'bcryptjs';
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'IkennaGIfenna',
    email: 'gabbyebook4study@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jordan Peterson Ikenna',
    email: 'jordanpetersonikenna@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
