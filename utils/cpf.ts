export default (strCPF: string) => {
  const cpfWithOutDot = strCPF.replaceAll('.', '').replace('-', '')
  let Soma;
  let Resto;
  Soma = 0;
  if (cpfWithOutDot == "00000000000") return false;

  for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(cpfWithOutDot.substring(i - 1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11)) Resto = 0;
  if (Resto != parseInt(cpfWithOutDot.substring(9, 10))) return false;

  Soma = 0;
  for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(cpfWithOutDot.substring(i - 1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11)) Resto = 0;
  if (Resto != parseInt(cpfWithOutDot.substring(10, 11))) return false;
  return true;
}
