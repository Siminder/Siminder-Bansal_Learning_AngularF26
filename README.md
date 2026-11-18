# Untitled1

## API: Open-Meteo

Live lake conditions come from [Open-Meteo](https://open-meteo.com/), a free weather API that
uses HTTPS, returns JSON, needs no API key and allows requests straight from the browser (CORS).

- Forecast API docs (air temperature, wind speed): https://open-meteo.com/en/docs
- Marine API docs (wave height): https://open-meteo.com/en/docs/marine-weather-api

Example request (current conditions for Lake Huron and Lake Erie in one call):

https://api.open-meteo.com/v1/forecast?latitude=44.8,41.8&longitude=-82.4,-81.5&current=temperature_2m,wind_speed_10m

Passing several comma-separated coordinates returns a plain JSON array with one object per
location. Each object wraps the values in a `current` object, for example
`{ "current": { "temperature_2m": 9.2, "wind_speed_10m": 30.0 } }`. Open-Meteo has no lake names
and no water temperature or water quality, so the app keeps a small local list of lakes (name,
coordinates, water quality) and fills in air temperature, wind speed and wave height from the API.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.8.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
