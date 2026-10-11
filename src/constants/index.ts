export const DEPARTMENTS = [
    "CS" , "Math" , "English"
]

export const DEPARTMENT_OPTIONS = DEPARTMENTS.map((department) => ({
    value: department.toLowerCase(),
    label: department,
  }));