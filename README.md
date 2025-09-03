# Currency Converter

A modern currency conversion application built with React and TypeScript.

### Architecture & Key Decisions
#### API Choice
1. Primary API: VatComply API - chosen for its reliability, no API key requirement, and accurate exchange rates
2. Fallback Option: ExchangeRateAPI - implemented as a backup for better reliability
3. Decision Rationale: These APIs provide simple REST interfaces with regularly updated currency rates without authentication requirements

#### Caching Strategy
1. Client-side Caching: Implemented to reduce API calls and minimize rate limiting
2. Cache Duration: Configurable through environment variables (default: 1 hour)
3. Storage: localStorage used for persistence across browser sessions
4. Benefits: Improved performance, reduced network requests, and offline functionality for recently accessed rates

#### Formatting & Validation
1. Decimal Input: Custom handling that accepts both comma and period as decimal separators
2. Number Formatting: Values formatted according to user's locale preferences
3. Input Validation: Prevents invalid characters and ensures only numerical values are processed

#### Custom Hooks
1. Created for API calls, currency formatting, and cached data retrieval

#### Error Handling
1. Comprehensive error handling with user-friendly messages

#### Component Architecture
1. Modular Design: Separation of concerns with container and presentational components
2. Reusable Components: Button, Input, Select, and other UI components built for reusability

## Setup Requirements

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation
1. Clone the repository:
```bash
git clone git@github.com:WebNataDav/currency-converter.git
cd currency-converter
```
2. Install dependencies:
npm install
3. Start the development server:
npm run dev