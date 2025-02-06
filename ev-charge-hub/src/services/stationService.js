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
        const station = {
            "station_id": "ST001",
            "name": "สถานีชาร์จรถยนต์ไฟฟ้า เซ็นทรัลเวิลด์",
            "latitude": 13.746879,
            "longitude": 100.539742,
            "company": "PTT EV Station",
            "status": {
                "open_hours": "00:00",
                "close_hours": "23:59",
                "is_open": true
            },
            "connectors": [
                {
                    "connector_id": "CT0010",
                    "type": "DC",
                    "plug_name": "CHAdeMo",
                    "price_per_unit": 6.5,
                    "power_output": 150,
                    "is_available": false
                },
                {
                    "connector_id": "CT0011",
                    "type": "AC",
                    "plug_name": "Type 1",
                    "price_per_unit": 4.5,
                    "power_output": 22,
                    "is_available": false
                },
                {
                    "connector_id": "CT0012",
                    "type": "DC",
                    "plug_name": "CCS1",
                    "price_per_unit": 6.8,
                    "power_output": 100,
                    "is_available": false
                }
            ]
        }
        try {
            if (!API_BASE_URL) {
                return station;
            }
            const response = await fetch(`${API_BASE_URL}/station/${stationId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching stations:', error);
            return station;
        }
    }
};