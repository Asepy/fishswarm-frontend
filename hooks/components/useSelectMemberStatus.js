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

export function useSelectMemberStatus(initialStatus) {
  const [selectedStatus, setSelectedStatus] = useState();
  const [validOptions, setValidOptions] = useState(() => {
    if (initialStatus == null) {
      return MEMBER_STATUS_OPTIONS;
    }
    return STATUS_TO_VALID_OPTIONS[initialStatus].map((option) => ({
      ...option,
      selected: false,
      onClick: makeOnClickOption(option)
    }));
  });

  function makeOnClickOption({ value }) {
    return () => {
      updateSelectedStatus(value);
    };
  }

  function updateSelectedStatus(value) {
    setSelectedStatus(value);
    setValidOptions(() => {
      return STATUS_TO_VALID_OPTIONS[value].map((option) => ({
        ...option,
        selected: false,
        onClick: makeOnClickOption(option)
      }));
    });
  }

  return {
    statusOptions: validOptions,
    selectedStatus,
    updateSelectedStatus,
    initialStatus
  };
}
