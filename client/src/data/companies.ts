import companiesData from './companies.json';

export interface Company {
  id: string;
  name: string;
  logo: string;
  category: string;
  rank: number;
  score: number;
  trend: string;
  views: number;
  complaints: number;
  responseRate: number;
  answered?: number; // Optional as it might not be in the JSON yet
}

// Cast the JSON data to the Company interface
const companies: Company[] = companiesData as unknown as Company[];

export default companies;
