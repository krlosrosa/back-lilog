import * as XLSX from 'xlsx';
import { Turno } from 'src/produtividade/enums/produtividade.enums';
import { File } from '@nest-lab/fastify-multer';

export function convertXlsxToArray(params: File): Promise<User[]> {
  const file = params.buffer;
  const workbook = XLSX.read(file, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet);

  const convertedData = data.map((item: any) => ({
    id: String(item['id'] ?? '').trim(),
    name: String(item['nome'] ?? '').trim(),
    turno: String(item['turno'] ?? '').trim() as Turno,
  }));

  return Promise.resolve(convertedData);
}

export type User = {
  id: string;
  name: string;
  turno: Turno;
};
