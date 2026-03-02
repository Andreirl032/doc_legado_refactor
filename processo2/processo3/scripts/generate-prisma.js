import { execSync } from 'child_process';

console.log('Generating Prisma client...');
execSync('npx prisma generate', { stdio: 'inherit', cwd: '/vercel/share/v0-project' });
console.log('Prisma client generated successfully!');
