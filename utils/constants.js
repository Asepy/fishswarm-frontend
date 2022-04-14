export const PAYMENT_METHOD_OPTIONS = [
  {
    value: "debito-automatico-mensual-de-tarjeta-de-credito",
    label: "Débito automático mensual de tarjeta de crédito"
  },
  {
    value: "pago-anual",
    label: "Pago Anual"
  }
];

export function paymentMethodToLabel(value) {
  const method = PAYMENT_METHOD_OPTIONS.find((op) => op.value === value);
  return method?.label;
}

export const DATE_TIME_SEARCH_FORMAT = "yyyy-MM-dd HH:mm:ss";
