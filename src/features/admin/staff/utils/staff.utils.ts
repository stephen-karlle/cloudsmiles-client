

export const getStaffBadgeColor = (employmentType: string) => {
  if (employmentType === "Full time") {
    return { bgColor: "#ecfdf5", textColor: "#10b981" };
  } else if (employmentType === "Part time") {
    return { bgColor: "#fffbeb", textColor: "#f59e0b" };
  } else {
    return { status: '', color: '' };
  }
};
