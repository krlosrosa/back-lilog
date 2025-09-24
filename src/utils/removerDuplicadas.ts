import { InputPaleteInfraDto } from 'src/transporte/domain/dtos/inputPalete.dto';

export function removeDuplicadosPorId(
  arr: InputPaleteInfraDto[],
): InputPaleteInfraDto[] {
  const map = new Map();
  arr.forEach((item) => {
    if (!map.has(item.transporteId)) {
      map.set(item.transporteId, item);
    }
  });
  return Array.from(map.values()) as InputPaleteInfraDto[];
}
