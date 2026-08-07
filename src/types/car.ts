export interface CarFeatures {
  climateControl: boolean;
  airConditioning: boolean;
  audioSystem: string;
  heatedSeats: boolean;
  heatedSteeringWheel: boolean;
  cruiseControl: boolean;
  parkingSensors: boolean;
  rearCamera: boolean;
  startStopSystem: boolean;
  multifunctionSteeringWheel: boolean;
  keylessAccess: boolean;
  leatherInterior: boolean;
  panoramicRoof: boolean;
  alloyWheels: boolean;
  fogLights: boolean;
}

export interface Car {
  id: string;
  mainImg: string;
  otherImages: string;
  name: string;
  year: number;
  isFavourite: boolean;
  inCart: boolean;
  newCar: boolean;
  color: string;
  salon: string;
  bgName: string;
  engine: string;
  stage: string;
  mainDrive: string;
  otherDrive: string;
  mainBodytype: string;
  otherBodyType: string;
  price: string;
  horsepower: number;
  seets: number;
  speed: number;
  distance: number;
  transmition: string;
  fuelConsumption: number;
  engineDisplacement: string;
  trunkCapacity: number;
  typeOfGearbox: string;
  features: CarFeatures;
  options: string[];
}
