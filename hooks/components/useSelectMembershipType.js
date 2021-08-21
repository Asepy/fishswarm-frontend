import { useState, useMemo } from "react";
import { getMembershipTypesAsOptions } from "components/members/MembershipType";

export function useSelectMembershipType(initialMembership) {
  const membershipTypes = getMembershipTypesAsOptions();
  const membershipTypesByValue = useMemo(
    () => getMembershipTypesAsOptions({ filterValue: initialMembership }),
    [initialMembership]
  );

  const [selectedMembershipType, setSelectedMembershipType] = useState();
  const [validMembershipOptions, setValidMembershipOptions] = useState(() => {
    if (initialMembership == null) {
      return membershipTypes;
    }

    return (
      membershipTypesByValue.map((option) => ({
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
      return membershipTypes
        .filter((m) => m.value !== value)
        .map((option) => ({
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
