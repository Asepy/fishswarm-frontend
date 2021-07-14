import { useState } from "react";

const MEMBERSHIP_TYPE_OPTIOINS = [
  { value: "PLUS_PENDIENTE", label: "Pendiente Plus" },
  { value: "PLUS", label: "Plus" },
  { value: "NORMAL", label: "Normal" }
];

const MEMBERSHIP_TYPE_TO_VALID_OPTIONS = {
  PLUS_PENDIENTE: [
    { value: "PLUS", label: "Plus" },
    { value: "NORMAL", label: "Normal" }
  ],
  PLUS: [
    { value: "PLUS_PENDIENTE", label: "Pendiente Plus" },
    { value: "NORMAL", label: "Normal" }
  ],
  NORMAL: [
    { value: "PLUS", label: "Plus" },
    { value: "PLUS_PENDIENTE", label: "Pendiente Plus" }
  ]
};

export function useSelectMembershipType(initialMembership) {
  const [selectedMembershipType, setSelectedMembershipType] = useState();
  const [validMembershipOptions, setValidMembershipOptions] = useState(() => {
    if (initialMembership == null) {
      return MEMBERSHIP_TYPE_OPTIOINS;
    }

    return (
      MEMBERSHIP_TYPE_TO_VALID_OPTIONS[initialMembership]?.map((option) => ({
        ...option,
        selected: false,
        onClick: makeOnClickOption(option)
      })) ?? []
    );
  });

  function makeOnClickOption({ value }) {
    return () => {
      updateMembershipType(value);
    };
  }

  function updateMembershipType(value) {
    setSelectedMembershipType(value);
    setValidMembershipOptions(() => {
      return MEMBERSHIP_TYPE_TO_VALID_OPTIONS[value].map((option) => ({
        ...option,
        selected: false,
        onClick: makeOnClickOption(option)
      }));
    });
  }

  return {
    membershipTypeOptions: validMembershipOptions,
    selectedMembershipType,
    updateMembershipType,
    initialMembership
  };
}
