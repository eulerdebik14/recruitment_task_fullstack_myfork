# 💱 Currency Exchange Dashboard (Recruitment Task)

This is a mini-application built for Telemedi recruitment purposes. It displays currency exchange rates for 5 currencies supported by a currency exchange office:

- Euro (EUR)
- US Dollar (USD)
- Czech Koruna (CZK)
- Indonesian Rupiah (IDR)
- Brazilian Real (BRL)

## 📌 Functionality

- View historical exchange rates for the last 14 days from a selected date (default is today).
- Rates include calculated **buy** and **sell** prices based on mid rates from NBP API.
- User-friendly interface with date picker and responsive tables.

## 🔧 Technologies Used

- PHP (Symfony 5.x)
- React.js (frontend)
- Axios (HTTP client)
- Bootstrap 4 (styling)
- Docker + Docker Compose (development & deployment)

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose installed on your system

### Installation

1. Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/recruitment_task_fullstack_myfork.git
cd recruitment_task_fullstack_myfork

```
2. Start the app:
```bash
docker-compose up --build -d
```

3. Visit the app in your browser:
```
http://telemedi-zadanie.localhost
```
4. Make sure your /etc/hosts includes:
```
127.0.0.1 telemedi-zadanie.localhost
```

## API endpoins
```
GET /api/rates/history?date=YYYY-MM-DD
```
Returns exchange rates for the 14 days prior to the given date.

## Demo video
[To be added:](https://youtu.be/jZPSQ_t4YJU)

##  Author Notes
- The app handles the case where no current-day data is available (fallback to earlier days).

- Only ExchangeRatesHistory component is used, as it is more reliable than showing real-time only data.

- All calculations (buy/sell) are done dynamically on the backend.

- Minimal, clean design optimized for clarity and usability.
