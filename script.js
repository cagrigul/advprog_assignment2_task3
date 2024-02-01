require([
    "esri/Map", 
    "esri/layers/CSVLayer", 
    "esri/views/MapView", 
    "esri/widgets/Legend"
], (
    Map,
    CSVLayer,
    MapView,
    Legend
) => {
    const url = "https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/main/Module%202/stl_crime_wgs_84.csv";

    const template = {
        title: "Crime committed at {ILEADSStreet}",
        content: "This incident occurred in the {District} district, within the {Neighborhood} neighborhood."
    };

    // Updated renderer settings
    const renderer = {
        type: "heatmap",
        colorStops: [
            { color: "rgba(255, 255, 255, 0)", ratio: 0 }, // Lighter color start
            { color: "rgba(0, 150, 136, 0.5)", ratio: 0.2 }, // Mid-intensity color
            { color: "rgba(255, 193, 7, 1)", ratio: 0.5 }, // Warmer color
            { color: "rgba(255, 87, 34, 1)", ratio: 0.8 }, // More intense color
            { color: "rgba(183, 28, 28, 1)", ratio: 1 } // Very intense color
        ],
        maxPixelIntensity: 200, // Increased maximum intensity
        minPixelIntensity: 50 // Increased minimum intensity
    };

    const layer = new CSVLayer({
        url: url,
        title: "St. Louis Crime Heatmap",
        copyright: "St. Louis Police Department",
        latitudeField: "Lat",
        longitudeField: "Lon",
        popupTemplate: template,
        renderer: renderer
    });

    const map = new Map({
        basemap: "dark-gray-vector",
        layers: [layer]
    });

    const view = new MapView({
        container: "viewDiv",
        center: [-90.1994, 38.6270], // Center on St. Louis
        zoom: 11,
        map: map
    });

    view.ui.add(
        new Legend({
            view: view
        }),
        "top-right"
    );
});
