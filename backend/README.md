# Backend API

## Environment Setup

This backend requires environment variables to be configured before running.

### Required Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=3000
DB_URL=mongodb://localhost:27017/fullstack-mobile-app
```

### Optional Environment Variables

```env
NODE_ENV=development
```

**NODE_ENV** can be one of:
- `development` (default)
- `production`
- `test`

### Using the .env.example File

A `.env.example` file is provided with sample values. Copy it to create your `.env` file:

```bash
cp .env.example .env
```

Then edit `.env` with your actual configuration values.

### Environment Validation

The application validates all environment variables on startup:

- **PORT**: Must be a number between 1 and 65535
- **DB_URL**: Required, must be set to your database connection string
- **NODE_ENV**: Optional, defaults to "development". A warning is shown if set to an unexpected value.

If required variables are missing or invalid, the application will fail to start with a clear error message indicating which variable needs to be fixed.

## Running the Server

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

## API Endpoints

- `GET /api/health` - Health check endpoint
