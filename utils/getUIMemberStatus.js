const statusMap = {
  ACTIVE: { label: "Activo", color: "green" },
  INACTIVE: { label: "Inactivo", color: "gray" },
  PENDING: { label: "Pendiente", color: "red" },
  CONDITIONAL: { label: "Condicional", color: "orange" },
};

export default function getUIMemberStatus(status) {
  return statusMap[status];
}
