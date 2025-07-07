// src/assets/assets.js
import image1 from './image1.jpg';
import image2 from './image2.jpg';
import image3 from './image3.jpeg';
import image5 from './image5.jpeg';
import image6 from './image6.jpeg';
import image7 from './image7.jpg';
import logo1 from './logo1.jpeg';
import grand_hotel from './grand_hotel.webp';
import indigo_logo from './indigo_logo.webp';
import spicejet from './spicejet.webp';
import goair from './goair.webp'; 
import vistara from './vistara.webp';
import mumbai from './mumbai.webp';
import benglore from './benglore.webp';
import pune from './pune.webp';
import jaipur from './jaipur.webp';
import udaipur from './udaipur.webp';
import shimla from './shimla.webp'; 
import otty from './otty.webp';
import deerjiling from './deerjiling.webp';
import goa from './goa.webp';
import kolkata from './kolkata.webp';
import chennai from './chennai.webp';
import ahemdabad from './ahemdabad.webp';
import lucknow from './lucknow.webp';
import hydrabad from './hydrabad.webp';
import gobook_logo from './gobook_logo.png';


export { 
     image1, 
     image2, 
     image3, 
     image5, 
     image6, 
     image7,
     gobook_logo
};

export const flight_list = [
  { id: 1, logo: logo1, airline: "Air India", from: "Delhi", to: "Mumbai", departureTime: "08:00", duration: "2h", price: 1200 },
  { id: 2, logo: indigo_logo, airline: "IndiGo", from: "Mumbai", to: "Delhi", departureTime: "10:00", duration: "2h 15m", price: 1100 },
  { id: 3, logo: spicejet, airline: "SpiceJet", from: "Bangalore", to: "Delhi", departureTime: "12:00", duration: "2h 30m", price: 1500 },
  { id: 4, logo: goair, airline: "GoAir", from: "Chennai", to: "Kolkata", departureTime: "09:00", duration: "2h 45m", price: 1400 },
  { id: 5, logo: vistara, airline: "Vistara", from: "Hyderabad", to: "Delhi", departureTime: "11:00", duration: "2h 10m", price: 1350 },
  { id: 6, logo: logo1, airline: "Air India", from: "Pune", to: "Goa", departureTime: "13:00", duration: "1h", price: 1000 },
  { id: 7, logo: indigo_logo, airline: "IndiGo", from: "Delhi", to: "Bangalore", departureTime: "14:00", duration: "2h 30m", price: 1550 },
  { id: 8, logo: spicejet, airline: "SpiceJet", from: "Ahmedabad", to: "Delhi", departureTime: "15:30", duration: "2h", price: 1250 },
  { id: 9, logo: goair, airline: "GoAir", from: "Lucknow", to: "Mumbai", departureTime: "17:00", duration: "2h 40m", price: 1450 },
  { id: 10, logo: vistara, airline: "Vistara", from: "Kolkata", to: "Bangalore", departureTime: "18:30", duration: "2h 35m", price: 1600 },
  { id: 11, logo: logo1, airline: "Air India", from: "Delhi", to: "Goa", departureTime: "06:00", duration: "2h", price: 1400 },
  { id: 12, logo: indigo_logo, airline: "IndiGo", from: "Bangalore", to: "Chennai", departureTime: "07:45", duration: "1h", price: 950 },
  { id: 13, logo: spicejet, airline: "SpiceJet", from: "Mumbai", to: "Hyderabad", departureTime: "09:20", duration: "1h 30m", price: 1100 },
  { id: 14, logo: goair, airline: "GoAir", from: "Chennai", to: "Delhi", departureTime: "16:15", duration: "2h 20m", price: 1350 },
  { id: 15, logo: vistara, airline: "Vistara", from: "Delhi", to: "Kolkata", departureTime: "20:00", duration: "2h 40m", price: 950 },
];

export const hotel_list = [
  { id: 1, logo: grand_hotel, name: "The Grand Delhi", location: "Delhi", price: 2000, rating: "4.5/5" },
  { id: 2, logo: mumbai, name: "Mumbai Marina", location: "Mumbai", price: 1800, rating: "4.2/5" },
  { id: 3, logo: benglore, name: "Bangalore Bliss", location: "Bangalore", price: 1500, rating: "4.3/5" },
  { id: 4, logo: goa, name: "Goa Paradise", location: "Goa", price: 2200, rating: "4.7/5" },
  { id: 5, logo: hydrabad, name: "Hyderabad Heights", location: "Hyderabad", price: 1700, rating: "4.4/5" },
  { id: 6, logo: kolkata, name: "Kolkata Comfort", location: "Kolkata", price: 1600, rating: "4.1/5" },
  { id: 7, logo: pune, name: "Pune Palace", location: "Pune", price: 1450, rating: "4.0/5" },
  { id: 8, logo: chennai, name: "Chennai Castle", location: "Chennai", price: 1650, rating: "4.3/5" },
  { id: 9, logo: ahemdabad, name: "Ahmedabad Arbour", location: "Ahmedabad", price: 1300, rating: "3.9/5" },
  { id: 10, logo: lucknow, name: "Lucknow Lodge", location: "Lucknow", price: 1250, rating: "4.2/5" },
  { id: 11, logo: jaipur, name: "Jaipur Jewels", location: "Jaipur", price: 1150, rating: "4.4/5" },
  { id: 12, logo: udaipur, name: "Udaipur View", location: "Udaipur", price: 1190, rating: "4.6/5" },
  { id: 13, logo: shimla, name: "Shimla Stay", location: "Shimla", price: 1145, rating: "4.0/5" },
  { id: 14, logo: otty, name: "Ooty Cottage", location: "Ooty", price: 1160, rating: "4.2/5" },
  { id: 15, logo: deerjiling, name: "Darjeeling Dream", location: "Darjeeling", price: 1155, rating: "4.5/5" },
];

// src/assets/hotelGeoLookup.js
export const hotelGeoLookup = {
  "1": { Lat: 28.6139, Lng: 77.2090 },
  "2": { Lat: 19.0760, Lng: 72.8777 },
  "3": { Lat: 13.0827, Lng: 80.2707 },
  "4": { Lat: 15.2993, Lng: 74.1240 },
  "5": { Lat: 17.3850, Lng: 78.4867 },
  "6": { Lat: 22.5726, Lng: 88.3639 },
  "7": { Lat: 18.5204, Lng: 73.8567 },
  "8": { Lat: 13.0827, Lng: 80.2707 },
  "9": { Lat: 23.0225, Lng: 72.5714 },
  "10": { Lat: 26.8467, Lng: 80.9462 },
  "11": { Lat: 26.9124, Lng: 75.7873 },
  "12": { Lat: 24.5854, Lng: 73.7125 },
  "13": { Lat: 31.1048, Lng: 77.1734 },
  "14": { Lat: 11.4064, Lng: 76.6932 },
  "15": { Lat: 27.0360, Lng: 88.2627 },
};

