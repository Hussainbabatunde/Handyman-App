export const capitalize = (str: string) =>{
    if(str){
        let string = str?.toLowerCase().trim()
        string = string[0].toUpperCase() + string.slice(1);
        return string;
    }
}

export function getStatusColor(
  status: string,
  artisanStatus?: string
): string {
  if (status === "rejected") {
    return "red";
  }
  if (status === "expired") {
    return "red";
  }

  if (status === "pending") {
    return "#FF9B5E";
  }

  if (status === "accepted") {
    if (artisanStatus === "ongoing") {
      return "#456EFE";
    }
    if (artisanStatus === "completed") {
      return "green";
    }
    return "purple"; // default for accepted
  }

  return "gray"; // fallback for unknown statuses
}
