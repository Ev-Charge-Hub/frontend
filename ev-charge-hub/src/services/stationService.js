import { mockStations } from '@/utils/mockStations';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const stationService = {
    async getStations() {
        try {
            if (!API_BASE_URL) {
                return mockStations;
            }
            const response = await fetch(`${API_BASE_URL}/stations`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching stations:', error);
            return mockStations;
        }
    }

    , async getStationById(stationId) {
        try {
            if (!API_BASE_URL) {
                return mockStations.at(0);
            }
            const response = await fetch(`${API_BASE_URL}/stations/${stationId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching stations:', error);
            return mockStations.at(0);
        }
    }

    , async filterStations({ company, type, search }) {
        try {
            const queryParams = new URLSearchParams();
    
            // Add query parameters conditionally if they exist
            if (company) queryParams.append('company', company);
            if (type) queryParams.append('type', type);
            if (search) queryParams.append('search', search);
    
            const queryString = queryParams.toString();
            const response = await fetch(`${API_BASE_URL}/stations/filter?${queryString}`);
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            return await response.json();
        } catch (error) {
            console.error('Error fetching filtered stations:', error);
            return mockStations; // You can return mock data as a fallback
        }
    }
};