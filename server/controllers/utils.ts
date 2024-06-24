export const convertGenderizeResponseToGender = (genderizeResponse: any) => {
  if (genderizeResponse.probability > 0.95) {
    return genderizeResponse.gender;
  }
  return "undetermined";
};
