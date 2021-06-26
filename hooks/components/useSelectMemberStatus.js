import { useState } from "react";

const MEMBER_STATUS_OPTIONS = [
  { value: "PENDING", label: "Pendiente" },
  { value: "ACTIVE", label: "Activo" },
  { value: "INACTIVE", label: "Inactivo" },
  { value: "CONDITIONAL", label: "Condicional" }
];

const STATUS_TO_VALID_OPTIONS = {
  PENDING: [
    { value: "ACTIVE", label: "Activo" },
    { value: "CONDITIONAL", label: "Condicional" },
    { value: "INACTIVE", label: "Inactivo" }
  ],
  ACTIVE: [
    { value: "CONDITIONAL", label: "Condicional" },
    { value: "INACTIVE", label: "Inactivo" },
    { value: "PENDING", label: "Pendiente" }
  ],
  INACTIVE: [
    { value: "PENDING", label: "Pendiente" },
    { value: "ACTIVE", label: "Activo" },
    { value: "CONDITIONAL", label: "Condicional" }
  ],
  CONDITIONAL: [
    { value: "PENDING", label: "Pendiente" },
    { value: "ACTIVE", label: "Activo" },
    { value: "INACTIVE", label: "Inactivo" }
  ]
};

export function useSelectMemberStatus(options = {}) {
  const { currentStatus = null } = options;
  const [selectedStatus, setSelectedStatus] = useState();
  const [validOptions, setValidOptions] = useState(() => {
    if (currentStatus === null) {
      return MEMBER_STATUS_OPTIONS;
    }
    return STATUS_TO_VALID_OPTIONS[currentStatus].map((option) => ({
      ...option,
      selected: false,
      onClick: makeOnClickOption(option)
    }));
  });

  function makeOnClickOption({ value }) {
    return () => {
      setSelectedStatus(value);
      setValidOptions((prevOptions) => {
        const selectedIndex = prevOptions.findIndex(
          (prevOpt) => prevOpt.value === value
        );
        return prevOptions.map((opt, index) => {
          if (index === selectedIndex) {
            return { ...opt, selected: true };
          }
          return { ...opt, selected: false };
        });
      });
    };
  }

  return { statusOptions: validOptions, selectedStatus };
}
