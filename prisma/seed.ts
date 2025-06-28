import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  const sqlFile = path.join(__dirname, 'seed_all.sql');
  const sqlContent = fs.readFileSync(sqlFile, 'utf8');
  // Tách từng câu lệnh SQL theo dấu ; (loại bỏ dòng trống và comment)
  const statements = sqlContent
    .split(';')
    .map(s => s.trim())
    .filter(s => s && !s.startsWith('--'));
  for (const stmt of statements) {
    try {
      await prisma.$executeRawUnsafe(stmt);
      console.log('Đã chạy:', stmt.slice(0, 80) + (stmt.length > 80 ? '...' : ''));
    } catch (err) {
      console.error('Lỗi khi chạy câu lệnh:', stmt, err);
      throw err;
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
