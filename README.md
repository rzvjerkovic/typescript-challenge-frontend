# Targomo Full Stack Developer Assignment

**Author**: Roberto Zvjerkovic  
**Company**: Targomo  
**Position**: Full Stack Developer Assignment

This project was a fun one to work on! In this project, I integrated the frontend and backend and added new functionality to manage transit stops and lines. I ended up spending more time than the 6-hour guideline (around 10 hours), as I needed to refresh my skills with NgRx and hadn’t used Angular in a while. I also aimed to pack in a few extra features, which meant that I didn't get to fully implement application tests within the timeframe.

## Features

### Backend API Updates

- Implemented API endpoints for deleting a transit stop and adding a new stop to a transit line.

### Frontend Enhancements

- **Details Component**: Displays relevant values of selected stops.
- **Add Stop Component**: Allows the addition of a new stop after a specified reference stop is open in the details component.
- **Map Highlighting**: Enables highlighting of selected stops on the map, in addition to highlighting on the sidebar.
- **Map Layers**: Added a layer to visually connect stops with lines on the map.
- **Delete Stop**: Implemented a feature for deleting a stop from the selected transit line.

## How to Run the Project

### Frontend

1. Clone the repository:
   ```bash
   git clone https://github.com/rzvjerkovic/targomo-frontend/
   ```
2. Navigate to the frontend directory:
   ```bash
   cd targomo-frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the frontend application:
   ```bash
   npm run start
   ```

### Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/rzvjerkovic/targomo-backend/
   ```
2. Navigate to the backend directory:
   ```bash
   cd targomo-backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the backend server:
   ```bash
   npm run start
   ```

The frontend and backend should now be running, and the application can be accessed via the frontend.

## Improvements and Future Work

### TODO

- **Shared Validation**: Implement Yup schemas for validation, ideally shared across frontend and backend within a shared library.
- **Error Reporting**: Add comprehensive error reporting across the app.
- **Local Storage Service**: Enhance the local storage service for more robustness and reusability; consider using NgRx Store local storage utilities.
- **Dynamic Coloring**: Calculate and apply color-coding to line attributes based on average and standard deviation.
- **Map Enhancements**: Resolve issues where map stop selection affects multiple lines and calculate averages across shared selections.
- **Performance**: Improve the line generator's performance, assuming stops may be well ordered.
- **Visual Differentiation**: Add unique coloring for each transit line to improve visual differentiation.
- **Delete Confirmation**: Implement a confirmation modal for stop deletion.
- **Store Management**: Add a separate section within the NgRx store for transit stops.
- **Dropdown Filtering**: Filter lines in dropdown based on connectivity to the selected stop.
- **Map Selector**: Add an option to select a new stop location directly on the map instead of via the form.
- **Persist Reference**: Save the reference stop as a query parameter in the URL when adding a new stop.
- **Exit Action**: Create a store action to handle form exit.
- **Reusable UI Components**: Refactor aside UI components for reusability across multiple contexts.

---
