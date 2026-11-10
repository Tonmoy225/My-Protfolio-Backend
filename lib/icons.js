import {
  FaPaintbrush, FaServer, FaDatabase, FaPython, FaScrewdriverWrench, FaBrain,
  FaHeartPulse, FaUtensils, FaRecycle, FaChartLine, FaCartShopping, FaCode,
} from 'react-icons/fa6';

export const iconMap = {
  design: FaPaintbrush,
  server: FaServer,
  database: FaDatabase,
  ai: FaPython,
  tools: FaScrewdriverWrench,
  brain: FaBrain,
  heart: FaHeartPulse,
  food: FaUtensils,
  recycle: FaRecycle,
  chart: FaChartLine,
  cart: FaCartShopping,
  code: FaCode,
};

export const iconNames = Object.keys(iconMap);
export const getIcon = (name) => iconMap[name] || FaCode;
