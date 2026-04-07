export type AnimalReport = {
  id: number;
  name: string;
  type: AnimalType;
  photo: string;
  description: string;
  contact: string;
  lastLocation: {
    address: string;
    lat: number;
    lng: number;
  };
  date: string;
  password: string;
  status: ReportStatus;
};

export enum AnimalType {
  Dog = "dog",
  Cat = "cat",
  Bird = "bird",
  Rabbit = "rabbit",
  Other = "other",
}

export enum ReportStatus {
  Lost = "lost",
  Found = "found",
}
