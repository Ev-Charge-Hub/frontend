# EV Charge Hub

A web application that integrates multiple EV charging networks in one place, helping users easily find charging stations, track availability, and calculate payments based on different provider rates.

## Prerequisites

Ensure you have the following installed:

- **Node.js** 
- **npm** or **yarn** (npm is installed with Node.js by default)

## Installation

1. **Clone the repository**:

   ```
   git clone https://github.com/Ev-Charge-Hub/frontend.git
   ```

   ```
   cd ev-charge-hub
   ```

2. **Install dependencies**:

   If you're using `npm`:

   ```
   npm install
   ```

   Or if you're using `yarn`:

   ```
   yarn install
   ```

3. **Set up environment variables**:

    Copy the .env.local.example file to .env.local:

    ```
    cp .env.local.example .env.local
    ```

    Open the .env.local file and add your API keys and other required configuration values:
    ```
    NEXT_PUBLIC_MAPS_API_KEY=your_google_maps_api_key
    ```
    To get your Google Maps API key, follow these steps:
    1. Visit the [Google Maps API Console](https://console.cloud.google.com/google/maps-apis/home?project=versatile-math-449515-q6&hl=en).
    2. Create or select a project.
    3. Enable the Maps API services you need.
    4. Create credentials (API Key) and paste it into the NEXT_PUBLIC_MAPS_API_KEY field in .env.local.


4. **Run the development server**:

   After the dependencies are installed, start the development server:

   ```
   npm run dev
   ```

   Or if you're using `yarn`:

   ```
   yarn dev
   ```

   The app will be running at `http://localhost:3000`.


