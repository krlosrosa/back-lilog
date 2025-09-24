export const gerarSenhaQuatroDigitos = () => {
  return Math.floor(1000 + Math.random() * 1000)
    .toString()
    .padStart(4, '0');
};
